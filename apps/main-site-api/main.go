package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	_ "letsbesafe.dev/main-site-api/migrations"
)

func main() {
	app := pocketbase.New()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
