package controller

import (
	"strings"
	"os"
	"github.com/gin-gonic/gin"
	"dylan/queue/models"
	"dylan/queue/input"
	"dylan/queue/db"
	"dylan/queue/helpers"
	"github.com/golang-jwt/jwt"
)

type QueueEntryController struct {
}

func (c *QueueEntryController) Create(context *gin.Context) {

	var q models.Queue

	result := db.GetDB().First(&q, "id = ?", context.Param("id"))

	if result.Error != nil {
		context.JSON(404, gin.H{
			"error": "Not found",
		})
		return
	}

	val, _ := context.Cookie("queue-token" + "-" + q.ID.String())
	
	if val == "" {
		var input input.QueueEntryInput

		err := context.ShouldBindJSON(&input)
	
		if err != nil {
			context.JSON(400, gin.H{
				"error": "Incorrect input",
			})
			return
		}

		if (!strings.HasPrefix(input.Redirect, q.Redirect)) {
			context.JSON(404, gin.H{
				"error": "Bad request domain",
			})
			return
		}

		qe := models.QueueEntry{QueueID: q.ID, Redirect: input.Redirect}

		db.GetDB().Create(&qe)
	
		jwtToken := helpers.GenerateQueueToken(qe.ID.String())
		
		context.SetCookie("queue-token" + "-" + q.ID.String(), jwtToken, 60*60*24, "/", os.Getenv("COOKIE_ORIGIN"), true, true)
		
		qe.Place = helpers.CalculatePlace(qe)
		context.JSON(200, qe)
	} else {
		token, err := helpers.ValidateToken(val)

		if err != nil {
			context.AbortWithStatusJSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		if token.Valid {
			claims := token.Claims.(jwt.MapClaims)

			var qe models.QueueEntry

			db.GetDB().First(&qe, "id = ?", claims["queue_entry_id"])

			qe.Place = helpers.CalculatePlace(qe)
			context.JSON(200, qe)
		} else {
			context.AbortWithStatusJSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}
	}
}
