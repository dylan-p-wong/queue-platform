package controller

import (
	"os"
	"fmt"
	"github.com/gin-gonic/gin"
	"dylan/queue/models"
	"dylan/queue/db"
	"github.com/google/uuid"
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

	fmt.Println(val)
	
	if val == "" {
		qe := models.QueueEntry{QueueID: uuid.MustParse(context.Param("id"))}

		db.GetDB().Create(&qe)
	
		jwtToken := helpers.GenerateQueueToken(qe.ID.String())
		
		context.SetCookie("queue-token" + "-" + q.ID.String(), jwtToken, 60*60*24, "/", os.Getenv("COOKIE_ORIGIN"), true, true)
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

			context.JSON(200, qe)
		} else {
			context.AbortWithStatusJSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}
	}
}
