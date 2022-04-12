package middleware

import (
	"dylan/queue/helpers"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func AuthorizeJWT() gin.HandlerFunc {
	return func(context *gin.Context) {
		val := context.Request.Header.Get("authorization")

		if val == "" {
			context.AbortWithStatusJSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		token, err := helpers.ValidateToken(val)

		if err != nil {
			context.AbortWithStatusJSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}

		if token.Valid {
			claims := token.Claims.(jwt.MapClaims)
			context.Set("user_id", claims["user_id"])
		} else {
			context.AbortWithStatusJSON(401, gin.H{
				"error": "Unauthorized",
			})
			return
		}
	}
}
