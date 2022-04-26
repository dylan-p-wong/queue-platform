package db

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	_ "github.com/lib/pq"
	"dylan/queue/models"
	"log"
	"os"
)

var db *gorm.DB
var err error

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func Init() {
	user := getEnv("PG_USER", "postgres")
	password := getEnv("PG_PASSWORD", "demo12345")
	host := getEnv("PG_HOST", "localhost")
	port := getEnv("PG_PORT", "5432")
	database := getEnv("PG_DB", "queue")

  dsn := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable",
    user,
    password,
    host,
    port,
    database,
  )

  db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
  if err != nil {
    log.Println("Failed to connect to database");
    panic(err);
  }
  log.Println("Database connected");

  db.AutoMigrate(&models.User{}, &models.Queue{}, &models.QueueEntry{});
}

func GetDB() *gorm.DB {
  return db
}
