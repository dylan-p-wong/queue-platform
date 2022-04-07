package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Queue struct {
	ID        uuid.UUID `gorm:"type:uuid" json:"id"`
	Title     string    `json:"title" binding:"required"`
	Description string  `json:"description"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Active    bool      `json:"active"`
	QueueEntries []QueueEntry `gorm:"ForeignKey:QueueID" json:"queue_entries"`
	Stopped  bool `gorm:"-" json:"stopped"`
}

func (queue *Queue) BeforeCreate(tx *gorm.DB) error {
	id, err := uuid.NewUUID();
	queue.ID = id;
	return err;
}
