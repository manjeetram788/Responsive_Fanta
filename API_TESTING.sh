#!/bin/bash
# API Testing Script - Copy and paste commands into terminal

API_BASE="http://localhost:5000/api/v1"

echo "=== Responsive Fanta API Testing ==="
echo ""

# Health Check
echo "1. Health Check:"
echo "curl $API_BASE/health"
echo ""

# Submit Contact Form
echo "2. Submit Contact (POST):"
echo "curl -X POST $API_BASE/contact \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"name\": \"John Doe\","
echo "    \"email\": \"john@example.com\","
echo "    \"subject\": \"Website Inquiry\","
echo "    \"message\": \"I would like to know more about your services.\""
echo "  }'"
echo ""

# Get All Contacts (Admin)
echo "3. Get All Contacts (GET):"
echo "curl $API_BASE/contact"
echo ""

# Get Services
echo "4. Get Active Services (GET):"
echo "curl $API_BASE/services"
echo ""

# Create Service
echo "5. Create Service (POST):"
echo "curl -X POST $API_BASE/services \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"title\": \"Consulting\","
echo "    \"description\": \"Expert consulting services\","
echo "    \"icon\": \"💡\","
echo "    \"price\": 2000"
echo "  }'"
echo ""

# Get Testimonials
echo "6. Get Testimonials (GET):"
echo "curl $API_BASE/testimonials"
echo ""

# Create Testimonial
echo "7. Create Testimonial (POST):"
echo "curl -X POST $API_BASE/testimonials \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"text\": \"Amazing service!\","
echo "    \"author\": \"Jane Smith\","
echo "    \"position\": \"CEO\","
echo "    \"company\": \"Tech Corp\","
echo "    \"rating\": 5"
echo "  }'"
echo ""

# Get Features
echo "8. Get Features (GET):"
echo "curl $API_BASE/features"
echo ""

# Create Feature
echo "9. Create Feature (POST):"
echo "curl -X POST $API_BASE/features \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"title\": \"Custom Feature\","
echo "    \"description\": \"This is a custom feature\","
echo "    \"number\": 5,"
echo "    \"icon\": \"✨\""
echo "  }'"
echo ""

# Update Contact Status
echo "10. Update Contact Status (PUT):"
echo "curl -X PUT $API_BASE/contact/{id} \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"status\": \"reviewed\","
echo "    \"response\": \"Thank you for your message. We will get back to you soon.\""
echo "  }'"
echo ""

# Delete Contact
echo "11. Delete Contact (DELETE):"
echo "curl -X DELETE $API_BASE/contact/{id}"
echo ""

echo "=== Using Postman or Thunder Client ==="
echo ""
echo "1. Open Postman/Thunder Client"
echo "2. Create new request with method (GET/POST/PUT/DELETE)"
echo "3. Enter URL: $API_BASE/endpoint"
echo "4. For POST/PUT: Go to Body tab → select 'raw' → JSON → paste data"
echo "5. Click Send"
echo ""

echo "=== Notes ==="
echo "- Make sure server is running: npm run dev"
echo "- Replace {id} with actual document ID from MongoDB"
echo "- All endpoints return JSON"
echo "- Check .env for correct port if not using 5000"
