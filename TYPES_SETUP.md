# Second Sheet Setup for Video Types

## Overview
Your YouTube Kids app now fetches video types from a second tab in your Google Sheets document. This allows you to manage video categories directly in Google Sheets.

## Setting Up the Second Sheet

### 1. Create a Second Tab
1. Open your Google Sheets document
2. Click the **+** button at the bottom to add a new sheet
3. Name the new sheet something like "Types" or "Categories"

### 2. Set Up the Types Sheet
In your second sheet, create a simple structure with video types:

**Column A: type**
```
type
Education
Music
Stories
Exercise
Games
Science
Art
Comedy
Tutorial
Adventure
```

### 3. Important Notes
- The column header should be exactly **"type"** (lowercase)
- You can also use "types" or "name" as the column header
- Each row should contain one video type
- Empty rows will be ignored
- The app will automatically combine types from:
  - Your second sheet
  - Video data (if videos have a type column)
  - Default types from the app configuration

### 4. Google Sheets URL Structure
Your main sheet URL looks like:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0
```

The app automatically constructs the second sheet URL:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=1
```

### 5. Sheet Structure Summary

**First Sheet (gid=0) - Videos:**
- title
- url  
- description
- type (optional - individual video types)

**Second Sheet (gid=1) - Types:**
- type (list of all available video categories)

## Benefits
- **Centralized Management**: Manage video types in one place
- **Easy Updates**: Add or remove types without code changes  
- **Consistency**: Ensure all videos use the same type names
- **Flexibility**: Types from both sheets and video data are combined
- **Fallback**: If the second sheet fails, the app uses default types

## Troubleshooting
- Make sure your Google Sheets document is public
- Ensure the second sheet exists (the app handles errors gracefully)
- Check that the column header is "type", "types", or "name"
- Verify your sheet IDs are correct in the URL
