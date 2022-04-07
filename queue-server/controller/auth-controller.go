package controller

import (
	"github.com/gin-gonic/gin"
	"dylan/queue/models"
	"dylan/queue/db"
)

type AuthController struct {
}

func (c *AuthController) GetUser(context *gin.Context) {
	user_id := context.MustGet("user_id")

	user := models.User{}
	result := db.GetDB().First(&user, "id = ?", user_id)

	if result.Error != nil {
		context.JSON(404, gin.H{
			"error": "Not found",
		});
		return
	}

	context.JSON(200, user)
}
