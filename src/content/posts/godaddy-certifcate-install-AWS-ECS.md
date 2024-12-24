---
title: "Mastering HTTPS on EC2: A Developer's SSL Configuration Journey"
description: "A personal walkthrough of implementing HTTPS for Spring Boot applications on EC2, turning technical challenges into working solutions"
date: 2024-12-24
categories: ["DevOps", "AWS", "Security", "Docker", "Spring Boot"]
author: "Mahmoud Ahmed"
featured: true
image: "/images/https-security.jpg"
---

# Complete Guide: Setting Up HTTPS for Your Spring Boot Docker Application on Amazon EC2

Have you ever deployed a Spring Boot application in a Docker container on EC2, only to struggle with setting up HTTPS? You're not alone! In this guide, I'll walk you through the entire process of configuring HTTPS for your dockerized Spring Boot application using Apache as a reverse proxy.

## What We'll Cover

1. Understanding the Architecture
2. Prerequisites
3. Step-by-Step Configuration
4. Troubleshooting Common Issues
5. Security Best Practices

## Understanding the Architecture

Before we dive in, let's understand what we're building:

```
Internet -> HTTPS (443) -> Apache -> HTTP (8080) -> Docker Container (Spring Boot)
```

In this setup:
- Apache acts as a reverse proxy and handles SSL termination
- Your Spring Boot application runs in a Docker container
- Apache forwards requests to your Docker container
- All external traffic is encrypted (HTTPS)

### Why This Approach?

1. **Separation of Concerns**: Let Apache handle SSL/TLS while your application focuses on business logic
2. **Security**: SSL termination at the proxy level is a best practice
3. **Flexibility**: Easily update certificates without touching your application
4. **Performance**: Apache is highly optimized for SSL handling

## Prerequisites

Before starting, make sure you have:

1. An EC2 instance running Amazon Linux
2. Your Spring Boot application running in Docker
3. SSL Certificate files:
   - Certificate file (.crt)
   - Private key file
   - Certificate chain file (usually .pem)
4. Domain name pointing to your EC2 instance

## Step-by-Step Configuration

### 1. Install Apache and SSL Module

```bash
# Update system packages
sudo yum update

# Install Apache and SSL module
sudo yum install httpd mod_ssl
```

### 2. Set Up SSL Certificates

First, create a directory for your certificates:

```bash
# Create SSL directory
sudo mkdir -p /etc/httpd/ssl
sudo chmod 700 /etc/httpd/ssl
```

Transfer your certificate files to the server:
```bash
# From your local machine
scp -i "your-key.pem" your-certificate.crt ec2-user@your-ec2-ip:/home/ec2-user/
scp -i "your-key.pem" your-private-key.txt ec2-user@your-ec2-ip:/home/ec2-user/
scp -i "your-key.pem" your-chain.pem ec2-user@your-ec2-ip:/home/ec2-user/
```

Move certificates to Apache's SSL directory:
```bash
# On EC2
sudo mv /home/ec2-user/your-certificate.crt /etc/httpd/ssl/certificate.crt
sudo mv /home/ec2-user/your-private-key.txt /etc/httpd/ssl/private.key
sudo mv /home/ec2-user/your-chain.pem /etc/httpd/ssl/chain.crt
```

Set proper permissions:
```bash
sudo chmod 600 /etc/httpd/ssl/*
sudo chown root:root /etc/httpd/ssl/*
```

### 3. Configure Apache SSL Module

Create the SSL module configuration:
```bash
sudo bash -c 'cat > /etc/httpd/conf.modules.d/00-ssl.conf << EOL
LoadModule ssl_module modules/mod_ssl.so
EOL'
```

### 4. Configure Apache Virtual Hosts

Create the main SSL configuration:
```bash
sudo bash -c 'cat > /etc/httpd/conf.d/ssl.conf << EOL
Listen 443 https

SSLPassPhraseDialog exec:/usr/libexec/httpd-ssl-pass-dialog
SSLSessionCache         shmcb:/run/httpd/sslcache(512000)
SSLSessionCacheTimeout  300
SSLRandomSeed startup file:/dev/urandom  256
SSLRandomSeed connect builtin
SSLCryptoDevice builtin
EOL'
```

Create virtual host configuration:
```bash
sudo bash -c 'cat > /etc/httpd/conf.d/vhost.conf << EOL
<VirtualHost *:80>
    ServerName yourdomain.com
    Redirect permanent / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    
    SSLEngine on
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCertificateFile /etc/httpd/ssl/certificate.crt
    SSLCertificateKeyFile /etc/httpd/ssl/private.key
    SSLCertificateChainFile /etc/httpd/ssl/chain.crt

    ProxyRequests Off
    ProxyPreserveHost On
    
    ProxyPass / http://127.0.0.1:8080/
    ProxyPassReverse / http://127.0.0.1:8080/

    ErrorLog logs/ssl_error_log
    CustomLog logs/ssl_access_log combined
</VirtualHost>
EOL'
```

### 5. Configure Docker Container

Modify your Docker container to only listen on localhost:
```bash
# Stop existing containers
docker stop container-id

# Start container with new port binding
docker run -d -p 127.0.0.1:8080:8080 your-image-name
```

### 6. Enable and Start Apache

```bash
# Configure SELinux to allow Apache to proxy
sudo setsebool -P httpd_can_network_connect 1

# Start and enable Apache
sudo systemctl start httpd
sudo systemctl enable httpd
```

### 7. Verify Configuration

Check Apache status:
```bash
sudo systemctl status httpd
```

Verify ports are listening:
```bash
sudo netstat -tulpn | grep -E ':80|:443'
```

## Troubleshooting Common Issues

### 1. Certificate Problems

If you see SSL certificate errors, check:
- Certificate file format (should start with "-----BEGIN CERTIFICATE-----")
- Private key format (should start with "-----BEGIN PRIVATE KEY-----")
- File permissions (should be 600)
- File ownership (should be root:root)

### 2. Connection Refused

If you can't connect to your application:
- Verify Docker container is running: `docker ps`
- Check if it's bound to localhost: `netstat -tulpn | grep 8080`
- Check Apache logs: `sudo tail -f /var/log/httpd/error_log`

### 3. Apache Won't Start

Common causes:
- Port conflicts
- SSL configuration errors
- SELinux restrictions

Check the logs:
```bash
sudo journalctl -xeu httpd.service
```

## Security Best Practices

1. **Keep Certificates Secure**
   - Store certificates in a restricted directory
   - Use proper file permissions
   - Regular certificate renewal

2. **Configure SSL Properly**
   - Disable old SSL/TLS versions
   - Use strong cipher suites
   - Enable HTTP to HTTPS redirection

3. **Regular Updates**
   - Keep Apache updated
   - Regular security patches
   - Monitor security advisories

## Testing Your Setup

After configuration, test your endpoints:
```bash
# Test HTTP redirect
curl -I http://yourdomain.com

# Test HTTPS
curl -I https://yourdomain.com
```

You should also test specific endpoints:
```bash
# Example endpoints
https://yourdomain.com/api/health
https://yourdomain.com/api/status
```

## Conclusion

You now have a secure HTTPS setup for your Spring Boot application running in Docker on EC2! This configuration provides:
- SSL/TLS encryption
- Automatic HTTP to HTTPS redirection
- Proper reverse proxy setup
- Clean separation of concerns

Remember to regularly monitor your logs and keep your certificates up to date. If you need to update certificates in the future, you'll only need to replace the files in `/etc/httpd/ssl/` and restart Apache.

## Additional Resources

- [Apache SSL Documentation](https://httpd.apache.org/docs/2.4/ssl/)
- [Docker Networking Guide](https://docs.docker.com/network/)
- [Spring Boot with SSL](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.webserver.configure-ssl)

Stay secure! 🔒