# Navigate to the src/routes directory in your project
ROUTES_DIR="./src/routes"

# Create the routes directory if it doesn't exist
mkdir -p $ROUTES_DIR

# Define all route component names, excluding the specified ones
ROUTES_FILES=("About" "Contact" "Chats" "Cart" "ProjectDetails" "Purchases" "Categories" "EditProfile" "VerifyPhone" "ForgetPassword" "VerifyIdentity" "OrderDetails" "RecievedOrders" "Terms" "Notifications" "ServiceDetails" "ProjectsOrders" "ProjectsOrdersDetails" "Privacy" "AddProject" "AboutPreview" "SubCategories" "Complaints" "MyCollections" "MyCollection" "BestFreeLancers" "ErrorPage" "Blogs" "BlogDetails" "Portfolios" "CommunityPosts" "CommunitySubjectDetails" "MyBids" "Balance" "ManageAccounts" "MyBidDetails")

# Function to create files with boilerplate React code
create_component() {
  local file_path=$1
  local component_name=$2
  echo "import React from 'react';" > $file_path
  echo "" >> $file_path
  echo "const $component_name = () => {" >> $file_path
  echo "  return <div>$component_name Page</div>;" >> $file_path
  echo "};" >> $file_path
  echo "" >> $file_path
  echo "export default $component_name;" >> $file_path
}

# Create all route files
for file in "${ROUTES_FILES[@]}"; do
  file_path="$ROUTES_DIR/$file.jsx"
  create_component $file_path $file
done

echo "All specified route files have been created successfully in the routes folder."
