#!/bin/bash

# Check if exiftool is installed
if ! command -v exiftool &> /dev/null; then
    echo "Error: exiftool is not installed. Please install it first with:"
    echo "sudo pacman -S perl-image-exiftool"
    exit 1
fi

# Supported image file extensions
IMAGE_EXTENSIONS=("*.jpg" "*.jpeg" "*.png" "*.tiff" "*.webp" "*.gif" "*.JPEG")

# Counter for processed files
processed_count=0
error_count=0

# Create a directory for backups
mkdir -p original_images_backup

# Process each image type
for ext in "${IMAGE_EXTENSIONS[@]}"; do
    for file in $ext; do
        # Check if file exists (to handle cases with no matching files)
        if [ -f "$file" ]; then
            # Create a backup
            cp "$file" "original_images_backup/$file"
            
            # Remove metadata
            if exiftool -all= -overwrite_original "$file"; then
                ((processed_count++))
            else
                ((error_count++))
                echo "Error processing $file"
            fi
        fi
    done
done

# Print summary
echo "Metadata Removal Complete:"
echo "Total files processed: $processed_count"
echo "Errors encountered: $error_count"
echo "Original files backed up in 'original_images_backup' directory"
