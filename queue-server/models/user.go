package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        uuid.UUID `gorm:"type:uuid"`
	Email     string    `json:"email" binding:"required"`
	Password  string  	`gorm:"->;<-;not null" json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (user *User) BeforeCreate(tx *gorm.DB) error {
	id, err := uuid.NewUUID();
	user.ID = id;
	return err;
}
