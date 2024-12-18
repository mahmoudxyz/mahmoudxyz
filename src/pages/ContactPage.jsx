import React, { useState } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Twitter,
  MessageCircle,
  Send,
  Clock,
  MapPin
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "mahmoudahmedxyz@gmail.com",
      link: "mailto:contact@yourdomain.com"
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "Mahmoud Ahmed",
      link: "https://linkedin.com/in/mahmoud4dev"
    },
    {
      icon: Github,
      title: "GitHub",
      value: "mahmoudxyz",
      link: "https://github.com/mahmoudxyz"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's Connect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're interested in collaboration, research opportunities, or just want to chat about bio-tech innovations, I'm always eager to connect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">


          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact Methods */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Connect Directly</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg hover:bg-muted transition-colors"
                  >
                    <method.icon className="h-5 w-5 text-primary mr-4" />
                    <div>
                      <div className="font-medium">{method.title}</div>
                      <div className="text-sm text-muted-foreground">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Office Hours */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Availability</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-4" />
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm text-muted-foreground">Usually within 4 hours</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-4" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted-foreground">Cairo, Egypt</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;