
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
};

const Support = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour, comment puis-je vous aider aujourd'hui?",
      sender: "agent",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    }
  ]);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage("");
    
    // Simulate agent response after a delay
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Merci pour votre message. Un de nos agents vous répondra dans les plus brefs délais.",
        sender: "agent",
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, agentMessage]);
    }, 1000);
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée",
      description: "Notre équipe vous contactera dans les plus brefs délais.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Support Technique</h1>
        
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="contact">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger value="faq">
              <Clock className="h-4 w-4 mr-2" />
              Heures de Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat de Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 overflow-y-auto border rounded-md p-4 mb-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`mb-4 ${
                        message.sender === "user" ? "text-right" : ""
                      }`}
                    >
                      <div
                        className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                          message.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message ici..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contactez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center">
                    <Phone className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium">Téléphone</h3>
                      <p className="text-gray-600">+212 522 123 456</p>
                      <p className="text-sm text-gray-500">Lun-Ven, 9h-18h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">support@drivesmart.ma</p>
                      <p className="text-sm text-gray-500">Réponse sous 24h</p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleContactFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">
                        Nom
                      </label>
                      <Input id="name" placeholder="Votre nom" required />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Votre email" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Sujet
                    </label>
                    <Input id="subject" placeholder="Sujet de votre demande" required />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full border rounded-md p-2"
                      placeholder="Décrivez votre problème ou votre question"
                      required
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Envoyer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Heures de Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Support par Chat</h3>
                    <p className="mb-2">Notre support par chat est disponible:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Lundi au Vendredi: 9h - 20h</li>
                      <li>Samedi: 10h - 17h</li>
                      <li>Dimanche: Fermé</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Support Téléphonique</h3>
                    <p className="mb-2">Notre support téléphonique est disponible:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Lundi au Vendredi: 9h - 18h</li>
                      <li>Samedi: 10h - 16h</li>
                      <li>Dimanche: Fermé</li>
                    </ul>
                    <p className="mt-2 text-gray-600">Téléphone: +212 522 123 456</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Support par Email</h3>
                    <p className="mb-2">Vous pouvez nous contacter par email à tout moment:</p>
                    <p className="text-gray-600">Email: support@drivesmart.ma</p>
                    <p className="mt-1 text-sm text-gray-500">Nous répondons généralement sous 24h ouvrables.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Support;
