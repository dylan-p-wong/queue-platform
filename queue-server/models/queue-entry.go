package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type QueueEntry struct {
	ID            uuid.UUID `gorm:"type:uuid" json:"id"`
	Email         string    `json:"email"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	QueueID       uuid.UUID `json:"queue_id"`
	Status        string    `json:"status" gorm:"default:WAITING"`
	RedirectToken string    `gorm:"redirect_token" json:"redirect_token"`
	Redirect 			string 		`gorm:"redirect" json:"redirect" binding:"required"`
	Place         int       `gorm:"-" json:"place"`
}

func (queueEntry *QueueEntry) BeforeCreate(tx *gorm.DB) error {
	id, err := uuid.NewUUID()
	queueEntry.ID = id
	return err
}
