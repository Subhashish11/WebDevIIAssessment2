-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (arm64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Health & Wellness'),(2,'Education'),(3,'Environment'),(4,'Community Support'),(5,'Animal Welfare');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(150) NOT NULL,
  `event_description` text,
  `event_date` date DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `ticket_price` decimal(8,2) DEFAULT '0.00',
  `fund_collected` decimal(10,2) DEFAULT '0.00',
  `fundraiser_goal` decimal(10,2) DEFAULT '0.00',
  `organiser_name` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Run for Hope','A charity marathon supporting local hospitals and cancer patients.','2025-11-15','Sydney Olympic Park',1,'images/cityRun.jpg',19.99,34000.00,80000.00,'PaceSteady','435678345'),(2,'Books for All','A drive to collect and donate books for underprivileged schools.','2025-12-01','Town Hall, Sydney',2,'images/bookSharing.jpg',0.00,800.00,5000.00,'Books4All','415672234'),(3,'Clean Beach Day','Join us in cleaning Bondi Beach and promoting ocean health.','2025-10-25','Bondi Beach',3,'images/beachCleaning.jpg',0.00,0.00,0.00,'BondiBiome','428767524'),(4,'Community Cookout','Free meals and social support for homeless individuals.','2025-11-20','Darling Harbour',4,'images/communityCookout.jpg',9.99,8900.00,30000.00,'FosterThePeople','412420690'),(5,'Paws in the Park','Pet adoption and fundraising event for local shelters.','2025-12-10','Centennial Park',5,'images/petAdoption.jpg',12.99,2300.00,15000.00,'LovelyPaws','405626578'),(6,'Community Art Fair','Local artists showcase their work to raise funds for schools.','2025-12-15','Paddington',2,'images/artFair.jpg',5.00,0.00,10000.00,'Art4Schools','0412345678'),(7,'Tree Planting Drive','Volunteers plant trees to restore local parks.','2025-12-20','Royal Botanic Gardens',3,'images/treePlanting.jpg',0.00,0.00,5000.00,'GreenEarth','0423456789'),(8,'Charity Concert','Live music to support local hospitals.','2025-12-22','Sydney Town Hall',1,'images/charityConcert.jpg',20.00,0.00,20000.00,'MusicForHope','0434567890'),(9,'Community Art Fair','Local artists showcase their work to raise funds for schools.','2025-12-15','Paddington',2,'images/artFair.jpg',5.00,0.00,10000.00,'Art4Schools','0412345678'),(10,'Tree Planting Drive','Volunteers plant trees to restore local parks.','2025-12-20','Royal Botanic Gardens',3,'images/treePlanting.jpg',0.00,0.00,5000.00,'GreenEarth','0423456789'),(11,'Charity Concert','Live music to support local hospitals.','2025-12-22','Sydney Town Hall',1,'images/charityConcert.jpg',20.00,0.00,20000.00,'MusicForHope','0434567890'),(12,'Community Art Fair','Local artists showcase their work to raise funds for schools.','2025-12-15','Paddington',2,'images/artFair.jpg',5.00,0.00,10000.00,'Art4Schools','0412345678'),(13,'Tree Planting Drive','Volunteers plant trees to restore local parks.','2025-12-20','Royal Botanic Gardens',3,'images/treePlanting.jpg',0.00,0.00,5000.00,'GreenEarth','0423456789'),(14,'Charity Concert','Live music to support local hospitals.','2025-12-22','Sydney Town Hall',1,'images/charityConcert.jpg',20.00,0.00,20000.00,'MusicForHope','0434567890');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-20  3:08:26
