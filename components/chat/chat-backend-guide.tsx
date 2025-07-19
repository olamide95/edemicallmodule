"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatBackendGuide() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Chat System Backend Implementation Guide</h1>

      <Tabs defaultValue="architecture">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="api">API Endpoints</TabsTrigger>
          <TabsTrigger value="realtime">Realtime</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
              <CardDescription>Overview of the NestJS backend architecture for the chat system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Core Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>NestJS Backend</strong>: RESTful API for chat operations
                </li>
                <li>
                  <strong>WebSocket Server</strong>: For real-time messaging using Socket.io
                </li>
                <li>
                  <strong>Database</strong>: MongoDB for storing messages and chat metadata
                </li>
                <li>
                  <strong>Redis</strong>: For pub/sub messaging and caching
                </li>
                <li>
                  <strong>Authentication</strong>: JWT-based authentication integrated with existing auth system
                </li>
              </ul>

              <h3 className="text-lg font-medium">Module Structure</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>ChatModule</strong>: Main module for chat functionality
                </li>
                <li>
                  <strong>MessageModule</strong>: Handles message creation, editing, and retrieval
                </li>
                <li>
                  <strong>ConversationModule</strong>: Manages direct and group conversations
                </li>
                <li>
                  <strong>NotificationModule</strong>: Handles message notifications
                </li>
                <li>
                  <strong>GatewayModule</strong>: WebSocket gateway for real-time communication
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Schema</CardTitle>
              <CardDescription>MongoDB schema design for the chat system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Collections</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Users</h4>
                  <pre className="bg-muted p-2 rounded-md text-sm overflow-x-auto">
                    {`{
  _id: ObjectId,
  username: String,
  displayName: String,
  avatar: String,
  role: String,
  status: String,  // online, offline, away
  lastSeen: Date
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">Conversations</h4>
                  <pre className="bg-muted p-2 rounded-md text-sm overflow-x-auto">
                    {`{
  _id: ObjectId,
  type: String,  // 'direct' or 'group'
  name: String,  // for group chats
  participants: [ObjectId],  // user IDs
  createdAt: Date,
  updatedAt: Date,
  lastMessage: {
    content: String,
    sender: ObjectId,
    timestamp: Date
  },
  // For group chats
  admin: ObjectId,
  settings: {
    allowMembersToPost: Boolean,
    allowMembersToReply: Boolean
  }
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">Messages</h4>
                  <pre className="bg-muted p-2 rounded-md text-sm overflow-x-auto">
                    {`{
  _id: ObjectId,
  conversationId: ObjectId,
  sender: ObjectId,
  content: String,
  contentType: String,  // 'text', 'file', 'link'
  timestamp: Date,
  readBy: [
    {
      userId: ObjectId,
      readAt: Date
    }
  ],
  deliveredTo: [
    {
      userId: ObjectId,
      deliveredAt: Date
    }
  ],
  replyTo: ObjectId,  // reference to another message
  edited: Boolean,
  editHistory: [
    {
      content: String,
      editedAt: Date
    }
  ],
  mentions: [ObjectId],  // user IDs
  attachments: [
    {
      type: String,  // 'image', 'document', etc.
      url: String,
      name: String,
      size: Number
    }
  ],
  metadata: {
    isUrgent: Boolean,
    expiresAt: Date,  // for urgent messages
    reminderDate: Date  // for date mentions
  }
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium">Notifications</h4>
                  <pre className="bg-muted p-2 rounded-md text-sm overflow-x-auto">
                    {`{
  _id: ObjectId,
  userId: ObjectId,
  type: String,  // 'message', 'mention', 'urgent'
  conversationId: ObjectId,
  messageId: ObjectId,
  read: Boolean,
  createdAt: Date
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>RESTful API endpoints for the chat system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Conversations</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code>GET /api/conversations</code> - Get all conversations for current user
                </li>
                <li>
                  <code>GET /api/conversations/:id</code> - Get a specific conversation
                </li>
                <li>
                  <code>POST /api/conversations</code> - Create a new conversation
                </li>
                <li>
                  <code>PUT /api/conversations/:id</code> - Update conversation settings
                </li>
                <li>
                  <code>DELETE /api/conversations/:id</code> - Delete a conversation
                </li>
              </ul>

              <h3 className="text-lg font-medium">Messages</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code>GET /api/conversations/:id/messages</code> - Get messages for a conversation
                </li>
                <li>
                  <code>POST /api/conversations/:id/messages</code> - Send a new message
                </li>
                <li>
                  <code>PUT /api/messages/:id</code> - Edit a message
                </li>
                <li>
                  <code>DELETE /api/messages/:id</code> - Delete a message
                </li>
                <li>
                  <code>POST /api/messages/:id/read</code> - Mark message as read
                </li>
                <li>
                  <code>POST /api/messages/:id/reply</code> - Reply to a message
                </li>
              </ul>

              <h3 className="text-lg font-medium">Users</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code>GET /api/users</code> - Get all users for mentions
                </li>
                <li>
                  <code>GET /api/users/status</code> - Get online status of users
                </li>
                <li>
                  <code>PUT /api/users/status</code> - Update user's online status
                </li>
              </ul>

              <h3 className="text-lg font-medium">Notifications</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code>GET /api/notifications</code> - Get all notifications for current user
                </li>
                <li>
                  <code>PUT /api/notifications/:id</code> - Mark notification as read
                </li>
                <li>
                  <code>POST /api/notifications/urgent</code> - Send an urgent notification
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Realtime Implementation</CardTitle>
              <CardDescription>WebSocket implementation using Socket.io with NestJS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">WebSocket Gateway</h3>
              <pre className="bg-muted p-2 rounded-md text-sm overflow-x-auto">
                {`// chat.gateway.ts
import { 
  WebSocketGateway, 
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;
      
      // Store user socket mapping
      await this.userService.setUserSocket(userId, client.id);
      
      // Join user to their conversation rooms
      const conversations = await this.conversationService.getUserConversations(userId);
      conversations.forEach(conv => {
        client.join(\`conversation_\${conv._id}\`);
      });
      
      // Update user status to online
      await this.userService.updateStatus(userId, 'online');
      this.server.emit('user_status_changed', { userId, status: 'online' });
    } catch (e) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userId = await this.userService.getUserIdBySocketId(client.id);
      if (userId) {
        await this.userService.removeUserSocket(userId);
        await this.userService.updateStatus(userId, 'offline');
        this.server.emit('user_status_changed', { userId, status: 'offline' });
      }
    } catch (e) {
      console.error('Disconnect error:', e);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(client: Socket, payload: any) {
    const { conversationId, content, replyTo, mentions, isUrgent } = payload;
    
    try {
      const token = client.handshake.auth.token;
      const jwtPayload = this.jwtService.verify(token);
      const userId = jwtPayload.sub;
      
      // Create message in database
      const message = await this.messageService.create({
        conversationId,
        sender: userId,
        content,
        replyTo,
        mentions,
        metadata: { isUrgent }
      });
      
      // Emit to all users in the conversation
      this.server.to(\`conversation_\${conversationId}\`).emit('new_message', message);
      
      // Handle mentions
      if (mentions && mentions.length) {
        for (const mentionedUserId of mentions) {
          const socketId = await this.userService.getSocketId(mentionedUserId);
          if (socketId) {
            this.server.to(socketId).emit('mention', { message, conversationId });
          }
        }
      }
      
      // Handle urgent messages
      if (isUrgent) {
        const participants = await this.conversationService.getParticipants(conversationId);
        for (const participantId of participants) {
          if (participantId !== userId) {
            const socketId = await this.userService.getSocketId(participantId);
            if (socketId) {
              this.server.to(socketId).emit('urgent_message', { message, conversationId });
            }
          }
        }
      }
      
      // Update conversation last message
      await this.conversationService.updateLastMessage(conversationId, message);
      
      return { success: true, messageId: message._id };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  @SubscribeMessage('message_read')
  async handleMessageRead(client: Socket, payload: any) {
    const { messageId } = payload;
    
    try {
      const token = client.handshake.auth.token;
      const jwtPayload = this.jwtService.verify(token);
      const userId = jwtPayload.sub;
      
      await this.messageService.markAsRead(messageId, userId);
      const message = await this.messageService.findById(messageId);
      
      // Notify sender that message was read
      const socketId = await this.userService.getSocketId(message.sender);
      if (socketId) {
        this.server.to(socketId).emit('message_status_updated', { 
          messageId, 
          status: 'read',
          readBy: userId
        });
      }
      
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  // Additional event handlers for typing indicators, editing messages, etc.
}`}
              </pre>

              <h3 className="text-lg font-medium">Frontend Integration</h3>
              <pre className="bg-muted p-2 rounded-md text-sm overflow-x-auto">
                {`// chat-service.ts (Next.js frontend)
import { io, Socket } from 'socket.io-client';

export class ChatService {
  private socket: Socket;
  private token: string;
  
  constructor() {
    this.token = localStorage.getItem('token');
  }
  
  connect() {
    this.socket = io('http://localhost:3001', {
      auth: {
        token: this.token
      }
    });
    
    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });
    
    // Set up event listeners
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.socket.on('new_message', (message) => {
      // Update UI with new message
      // Dispatch to state management
    });
    
    this.socket.on('message_status_updated', (data) => {
      // Update message status in UI
    });
    
    this.socket.on('mention', (data) => {
      // Show notification for mention
    });
    
    this.socket.on('urgent_message', (data) => {
      // Show urgent message popup
    });
    
    this.socket.on('user_status_changed', (data) => {
      // Update user status in UI
    });
  }
  
  sendMessage(conversationId, content, replyTo = null, mentions = [], isUrgent = false) {
    return new Promise((resolve, reject) => {
      this.socket.emit('send_message', {
        conversationId,
        content,
        replyTo,
        mentions,
        isUrgent
      }, (response) => {
        if (response.success) {
          resolve(response.messageId);
        } else {
          reject(new Error(response.error));
        }
      });
    });
  }
  
  markMessageAsRead(messageId) {
    this.socket.emit('message_read', { messageId });
  }
  
  // Additional methods for other chat functionality
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
