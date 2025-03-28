import { useState } from "react";
import {
  MessageSquare,
  Send,
  ArrowDown,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIAdvisorProps {
  className?: string;
}

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB_IGx9NjhQ11Xoo7dkhk5I222dkAAYsh0";

const presetQuestions = [
  "What stocks should I consider for long-term growth?",
  "How should I diversify my portfolio?",
  "What's the best way to minimize tax on my investments?",
  "Should I invest in crypto currencies?",
];

const systemPrompt = `You are an AI investment advisor. 
You provide personalized financial and investment advice based on the user's questions.
Be professional, concise, and informative. Focus on general investment principles and strategies.
Do not provide specific stock recommendations that could be construed as financial advice.
Include disclaimers when appropriate about consulting with professional financial advisors for personalized investment decisions.
You can use markdown formatting in your responses. For example, use **text** to make text bold for emphasis.`;

const AIAdvisor = ({ className }: AIAdvisorProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI investment advisor. How can I help you with your investment strategy today?",
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateGeminiPrompt = (
    messageHistory: Message[],
    newMessage: string
  ) => {
    // Format the conversation history and new message for Gemini
    const formattedMessages = messageHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Add the user's new message
    formattedMessages.push({
      role: "user",
      parts: [{ text: newMessage }],
    });

    // Add system prompt as first message if not already in conversation
    if (messageHistory.length <= 1) {
      formattedMessages.unshift({
        role: "model",
        parts: [{ text: systemPrompt }],
      });
    }

    return {
      contents: formattedMessages,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };
  };

  const handleSendMessage = async (content?: string) => {
    const message = content || input;
    if (!message.trim()) return;

    // Add user message
    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: message,
        timestamp: new Date(),
      },
    ];
    setMessages(updatedMessages);

    // Clear input
    setInput("");

    // Set loading state
    setLoading(true);

    try {
      const requestBody = generateGeminiPrompt(messages, message);

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();

      // Extract the AI response from Gemini
      let aiResponse =
        "I'm sorry, I couldn't generate a response. Please try again.";

      if (
        responseData.candidates &&
        responseData.candidates[0] &&
        responseData.candidates[0].content &&
        responseData.candidates[0].content.parts &&
        responseData.candidates[0].content.parts[0] &&
        responseData.candidates[0].content.parts[0].text
      ) {
        aiResponse = responseData.candidates[0].content.parts[0].text;
      }

      // Add AI response to messages
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: aiResponse,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again later.",
        variant: "destructive",
      });

      // Add fallback response
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("flex h-full flex-col overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-medium">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Investment Advisor
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 overflow-auto p-0">
        <div className="space-y-4 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-2",
                message.role === "assistant"
                  ? "bg-secondary"
                  : "ml-6 bg-primary/5"
              )}
            >
              {message.role === "assistant" && (
                <div className="rounded-full bg-primary p-1 text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              {message.role === "user" && (
                <div className="rounded-full bg-background p-1 text-foreground">
                  <MessageSquare className="h-4 w-4" />
                </div>
              )}
              <div className="flex-1">
                {message.role === "assistant" ? (
                  <div className="text-sm markdown-content">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3 rounded-lg bg-secondary px-3 py-2">
              <div className="rounded-full bg-primary p-1 text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 animation-delay-200"></span>
                  <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 animation-delay-500"></span>
                </div>
              </div>
            </div>
          )}
          <div className="h-4" /> {/* Extra space at the bottom */}
        </div>
      </CardContent>

      {/* Suggested questions */}
      {messages.length <= 2 && !loading && (
        <div className="px-4 pb-4">
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Popular questions:
          </h4>
          <div className="flex flex-wrap gap-2">
            {presetQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto py-1.5 text-xs"
                onClick={() => handleSendMessage(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      <CardFooter className="pt-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Ask about investment strategies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-10"
            disabled={loading}
          />
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full"
            disabled={loading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIAdvisor;
