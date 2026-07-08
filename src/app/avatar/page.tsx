/**
 * AI Wealth Avatar Chat Page
 * Full-screen conversational AI interface for financial coaching.
 * Features streaming responses, suggested questions, and rich message rendering.
 */
'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { Send, Bot, User, Sparkles, ArrowDown } from 'lucide-react';
import { suggestedQuestions } from '@/lib/data/syntheticData';
import { AVATAR_GREETING, INITIAL_SUGGESTIONS } from '@/lib/ai/prompts';
import { generateId } from '@/lib/utils/sanitizer';

/** Chat message type */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

/**
 * Avatar Chat Page Component
 * Provides the conversational interface for the AI Wealth Avatar.
 */
export default function AvatarPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'greeting',
      role: 'assistant',
      content: AVATAR_GREETING,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /** Scroll to the bottom of the chat */
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /** Handle scroll position to show/hide scroll button */
  const handleScroll = useCallback(() => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollBtn(!isNearBottom);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Sends a message to the AI chat API and handles the response.
   * Supports both streaming and non-streaming responses.
   */
  const sendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim() || isLoading) return;

      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: messageText.trim(),
        timestamp: new Date().toISOString(),
      };

      // Add user message
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      // Add placeholder for AI response
      const aiMessageId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
          isStreaming: true,
        },
      ]);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: messageText.trim(),
            history: messages
              .filter((m) => m.id !== 'greeting')
              .slice(-10)
              .map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to get response');
        }

        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('text/plain')) {
          // Streaming response
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();

          if (reader) {
            let fullContent = '';
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              fullContent += chunk;

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === aiMessageId
                    ? { ...m, content: fullContent, isStreaming: true }
                    : m
                )
              );
            }

            // Mark streaming as complete
            setMessages((prev) =>
              prev.map((m) =>
                m.id === aiMessageId ? { ...m, isStreaming: false } : m
              )
            );
          }
        } else {
          // JSON response
          const data = await response.json();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === aiMessageId
                ? { ...m, content: data.message, isStreaming: false }
                : m
            )
          );
        }
      } catch (error) {
        console.error('Chat error:', error);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMessageId
              ? {
                  ...m,
                  content:
                    'I apologize, but I encountered an issue. Please try again or contact IDBI Bank support.',
                  isStreaming: false,
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, messages]
  );

  /** Handle form submission */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  /** Handle suggestion chip click */
  const handleSuggestion = (text: string) => {
    sendMessage(text);
  };

  /** Handle Enter key (submit) and Shift+Enter (newline) */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  /** Format message content with basic markdown-like rendering */
  const renderMessageContent = (content: string) => {
    if (!content) return null;

    // Split by lines and process
    const lines = content.split('\n');
    return lines.map((line, i) => {
      // Bold text
      const processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic text
      const withItalics = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li
            key={i}
            style={{ marginLeft: '1rem', listStyle: 'disc' }}
            dangerouslySetInnerHTML={{ __html: withItalics.replace(/^[-•]\s*/, '') }}
          />
        );
      }

      if (line.startsWith('---')) {
        return <hr key={i} className="divider" />;
      }

      if (line.trim() === '') {
        return <br key={i} />;
      }

      return (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: withItalics }}
          style={{ marginBottom: '0.25rem' }}
        />
      );
    });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div className="avatar-hero" aria-hidden="true">
            <Sparkles size={32} />
          </div>
          <div>
            <h1 className="page-title" id="avatar-page-title">
              WealthWise AI Coach
            </h1>
            <p className="page-description">
              Your personal financial advisor powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="chat-container" aria-label="Chat with AI Wealth Avatar" role="log">
          {/* Messages */}
          <div
            className="chat-messages"
            ref={messagesContainerRef}
            onScroll={handleScroll}
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.role === 'user' ? 'user' : 'ai'}`}
                id={`msg-${message.id}`}
              >
                <div
                  className={`chat-message-avatar ${message.role === 'user' ? 'user' : 'ai'}`}
                  aria-hidden="true"
                >
                  {message.role === 'user' ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div className="chat-message-bubble">
                  {message.isStreaming && !message.content ? (
                    <div className="typing-indicator" aria-label="AI is typing">
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                      <div className="typing-dot" />
                    </div>
                  ) : (
                    <div>{renderMessageContent(message.content)}</div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll to bottom button */}
          {showScrollBtn && (
            <button
              className="btn btn-icon btn-secondary"
              onClick={scrollToBottom}
              aria-label="Scroll to latest message"
              style={{
                position: 'absolute',
                bottom: '120px',
                right: '20px',
                zIndex: 5,
              }}
            >
              <ArrowDown size={16} />
            </button>
          )}

          {/* Suggestion Chips */}
          {messages.length <= 1 && (
            <div className="chat-suggestions" role="group" aria-label="Suggested questions">
              {INITIAL_SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  className="chat-suggestion-chip"
                  onClick={() => handleSuggestion(suggestion)}
                  id={`suggestion-${i}`}
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* More suggestions after conversation starts */}
          {messages.length > 1 && messages.length < 6 && !isLoading && (
            <div className="chat-suggestions" role="group" aria-label="More questions">
              {suggestedQuestions.slice(0, 4).map((sq) => (
                <button
                  key={sq.id}
                  className="chat-suggestion-chip"
                  onClick={() => handleSuggestion(sq.text)}
                  id={`sq-${sq.id}`}
                >
                  {sq.icon} {sq.text}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <form
            className="chat-input-container"
            onSubmit={handleSubmit}
            aria-label="Send a message"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your financial question
            </label>
            <textarea
              ref={inputRef}
              id="chat-input"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me about your finances..."
              disabled={isLoading}
              rows={1}
              aria-describedby="chat-hint"
            />
            <span id="chat-hint" className="sr-only">
              Press Enter to send, Shift+Enter for new line
            </span>
            <button
              type="submit"
              className="btn btn-accent btn-icon"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              id="send-message-btn"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer" style={{ marginTop: 'var(--space-4)' }}>
        💡 WealthWise AI provides guidance based on your financial data. It does not constitute
        certified financial advice. Consult a qualified advisor for investment decisions.
      </div>
    </div>
  );
}
