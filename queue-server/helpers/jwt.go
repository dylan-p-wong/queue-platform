package helpers

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type jwtCustomClaim struct {
	UserID string `json:"user_id"`
	jwt.StandardClaims
}

type jwtQueueIDCustomClaim struct {
	QueueEntryID string `json:"queue_entry_id"`
	jwt.StandardClaims
}

type jwtRedirectCustomClaim struct {
	QueueEntryID string `json:"queue_entry_id"`
	QueueID      string `json:"queue_id"`
	jwt.StandardClaims
}

func GenerateToken(UserID string) string {
	secretKey := os.Getenv("JWT_SECRET")

	claims := &jwtCustomClaim{
		UserID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().AddDate(1, 0, 0).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secretKey))
	if err != nil {
		panic(err)
	}
	return t
}

func GenerateQueueToken(QueueEntryID string) string {
	secretKey := os.Getenv("JWT_SECRET")

	claims := &jwtQueueIDCustomClaim{
		QueueEntryID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().AddDate(1, 0, 0).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secretKey))
	if err != nil {
		panic(err)
	}
	return t
}

func GenerateRedirectToken(QueueEntryID string, QueueID string, NumberOfMinutes int) string {
	secretKey := os.Getenv("JWT_SECRET")

	claims := &jwtRedirectCustomClaim{
		QueueEntryID,
		QueueID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * time.Duration(NumberOfMinutes)).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString([]byte(secretKey))
	if err != nil {
		panic(err)
	}
	return t
}

func ValidateToken(token string) (*jwt.Token, error) {
	secretKey := os.Getenv("JWT_SECRET")

	return jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method %v", token.Header["alg"])
		}
		return []byte(secretKey), nil
	})
}
