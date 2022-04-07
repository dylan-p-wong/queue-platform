package controller

import (
	// "os"
	"dylan/queue/db"
	"dylan/queue/models"
	"dylan/queue/input"
	"dylan/queue/helpers"
	"github.com/gin-gonic/gin"
)

type UserController struct {
}

func (c *UserController) Register(context *gin.Context) {
	var input input.RegisterInput

	err := context.ShouldBindJSON(&input)

	if err != nil {
		context.JSON(400, gin.H{
			"error": "Incorrect input",
		})
		return
	}

	result, passwordErr := helpers.HashPassword(input.Password)

	if passwordErr != nil {
		context.JSON(400, gin.H{
			"error": "Password error",
		})
		return
	}

	user := models.User{Email: input.Email, Password: result}

	db.GetDB().Create(&user)

	jwtToken := helpers.GenerateToken(user.ID.String())

	context.SetCookie("authorization", jwtToken, 60*60*24, "/", "", true, true)

	context.JSON(200, user);
}
