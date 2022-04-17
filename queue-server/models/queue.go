package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
	"encoding/base64"
	"dylan/queue/repository"
)

type Queue struct {
	ID           uuid.UUID    `gorm:"type:uuid" json:"id"`
	Title        string       `json:"title" binding:"required"`
	Description  string       `json:"description"`
	CreatedAt    time.Time    `json:"created_at"`
	UpdatedAt    time.Time    `json:"updated_at"`
	Active       bool         `json:"active"`
	PassRate     int          `json:"pass_rate" binding:"required"`
	TokenTime    int          `json:"token_time" binding:"required"`
	Redirect     string       `json:"redirect_domain" binding:"required"`
	SecretKey 	 string 			`json:"secret_key"`
	UserID       uuid.UUID    `json:"user_id" binding:"required"`
	QueueEntries []QueueEntry `gorm:"ForeignKey:QueueID" json:"queue_entries"`
	Stopped      bool         `gorm:"-" json:"stopped"`
}

func (queue *Queue) BeforeCreate(tx *gorm.DB) error {
	id, err := uuid.NewUUID()
	queue.ID = id
	queue.SecretKey = base64.StdEncoding.EncodeToString(repository.NewRandomKey())
	return err
}
