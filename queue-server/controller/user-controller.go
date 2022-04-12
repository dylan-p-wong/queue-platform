package controller

import (
	// "os"
	"dylan/queue/db"
	"dylan/queue/helpers"
	"dylan/queue/input"
	"dylan/queue/models"

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

	if helpers.EmailExists(input.Email) {
		context.JSON(400, gin.H{
			"error": "Account with this email exists",
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

	user.Token = jwtToken

	context.JSON(200, user)
}

func (c *UserController) Login(context *gin.Context) {
	var input input.LoginInput

	err := context.ShouldBindJSON(&input)

	if err != nil {
		context.JSON(400, gin.H{
			"error": "Error",
		})
		return
	}

	var user models.User

	result := db.GetDB().First(&user, "email = ?", input.Email)

	if result.Error != nil {
		context.JSON(400, gin.H{
			"error": "Error",
		})
		return
	}

	isMatch, passwordErr := helpers.ComparePassword(input.Password, user.Password)

	if passwordErr != nil {
		context.JSON(400, gin.H{
			"error": "Error",
		})
		return
	}

	if !isMatch {
		context.JSON(400, gin.H{
			"error": "Error",
		})
		return
	}

	jwtToken := helpers.GenerateToken(user.ID.String())

	user.Token = jwtToken

	context.JSON(200, user)
}
