FROM ubuntu:latest

# Install curl
RUN apt-get update && apt-get install -y curl

# Copy the password change script
COPY ./change_kibana_system_password.sh ./change_kibana_system_password.sh

# Make the script executable
RUN chmod +x ./change_kibana_system_password.sh

# Run the password change script
CMD ["./change_kibana_system_password.sh"]
