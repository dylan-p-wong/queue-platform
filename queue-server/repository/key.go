package repository

import (
	"crypto/rand"
)

func NewRandomKey() []byte {
	key := make([]byte, 32)
	if _, err := rand.Read(key); err != nil {
		panic(err)
	}

	return key
}
