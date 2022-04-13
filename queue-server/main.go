package main

import (
	"os"
	"time"
	"dylan/queue/db"
	"dylan/queue/middleware"
	"dylan/queue/queue"
	"dylan/queue/controller"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func init() {
	if os.Getenv("ENV") != "production" && os.Getenv("ENV") != "staging" {
		errEnv := godotenv.Load()

		if errEnv != nil {
			panic("Failed to load env file")
		}
	}

	db.Init();
	queue.Init();
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("CORS_ORIGIN")},
		AllowMethods:     []string{"POST", "PUT", "PATCH", "GET", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Origin"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}));

	authController := controller.AuthController{}
	userController := controller.UserController{}
	queueController := controller.QueueController{}
	queueEntryController := controller.QueueEntryController{}

	userRoutes := r.Group("/user", middleware.AuthorizeJWT())
	{
		userRoutes.GET("/", authController.GetUser);
	}

	authRoutes := r.Group("/auth")
	{
		authRoutes.POST("/register", userController.Register)
		authRoutes.POST("/login", userController.Login)
	}

	adminQueueRoutes := r.Group("/admin/queue", middleware.AuthorizeJWT())
	{
		adminQueueRoutes.GET("/", queueController.FindAll)
		adminQueueRoutes.POST("/", queueController.Create)
		adminQueueRoutes.GET("/:id", queueController.Find)
		adminQueueRoutes.POST("/:id/start", queueController.Start)
		adminQueueRoutes.POST("/:id/stop", queueController.Stop)
	}

	queueRoutes := r.Group("/queue")
	{
		queueRoutes.GET("/:id/entry", queueEntryController.Create)
	}

	r.Run()
}
