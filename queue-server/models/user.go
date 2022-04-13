package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid;unique" json:"id"`
	Email     string    `gorm:"type:varchar(100);unique" json:"email" binding:"required"`
	Password  string    `gorm:"->;<-;not null" json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Token     string    `gorm:"-" json:"token"`
	Queues    []Queue   `gorm:"ForeignKey:UserID" json:"queue_entries"`
}

func (user *User) BeforeCreate(tx *gorm.DB) error {
	id, err := uuid.NewUUID()
	user.ID = id
	return err
}
