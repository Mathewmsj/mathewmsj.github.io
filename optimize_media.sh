#!/bin/bash

# Function to convert PNG to JPG
convert_images() {
  echo "Finding PNG images..."
  find ./public -name "*.png" | while read -r file; do
    dir=$(dirname "$file")
    filename=$(basename "$file" .png)
    new_file="$dir/$filename.jpg"
    
    echo "Converting $file to $new_file..."
    sips -s format jpeg -s formatOptions 80 "$file" --out "$new_file"
    
    # Check if conversion was successful
    if [ -f "$new_file" ]; then
      echo "Removing original $file..."
      rm "$file"
    fi
  done
}

# Function to convert MOV to MP4
convert_videos() {
  echo "Finding MOV videos..."
  find ./public -name "*.mov" | while read -r file; do
    dir=$(dirname "$file")
    filename=$(basename "$file" .mov)
    
    # Use generic generic names in tmp to avoid any encoding issues
    temp_id="$RANDOM"
    temp_mov="/tmp/video_${temp_id}.mov"
    temp_mp4="/tmp/video_${temp_id}.mp4"
    final_mp4="$dir/$filename.mp4"
    
    echo "Copying $file to $temp_mov for conversion..."
    cp "$file" "$temp_mov"
    
    echo "Converting $temp_mov to MP4..."
    # avconvert requires absolute paths for safety
    avconvert --source "$temp_mov" --preset Preset1280x720 --output "$temp_mp4" --replace
    
    # Check if conversion was successful (avconvert might make .m4v, check both)
    if [ -f "$temp_mp4" ]; then
        echo "Conversion successful. Moving to $final_mp4..."
        mv "$temp_mp4" "$final_mp4"
        echo "Removing original $file..."
        rm "$file"
    elif [ -f "/tmp/video_${temp_id}.m4v" ]; then
        echo "Conversion successful (m4v). Moving to $final_mp4..."
        mv "/tmp/video_${temp_id}.m4v" "$final_mp4"
        echo "Removing original $file..."
        rm "$file"
    else
        echo "Conversion failed for $file"
    fi
    
    # Cleanup temp files
    rm -f "$temp_mov" "$temp_mp4" "/tmp/video_${temp_id}.m4v"
  done
}

# Function to update code references
update_references() {
  echo "Updating code references..."
  # Find all files in src that contain .png or .mov and replace extensions
  # Using perl for inline replacement to avoid sed compatibility issues on macOS
  
  find ./src -type f \( -name "*.vue" -o -name "*.js" -o -name "*.css" \) -print0 | xargs -0 perl -pi -e 's/\.png/\.jpg/g'
  find ./src -type f \( -name "*.vue" -o -name "*.js" -o -name "*.css" \) -print0 | xargs -0 perl -pi -e 's/\.mov/\.mp4/g'
}

# Main execution
echo "Starting media optimization..."
convert_images
convert_videos
update_references
echo "Media optimization complete."
