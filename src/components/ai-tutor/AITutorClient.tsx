'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Send,
  BookOpen,
  MessageSquare,
  Award,
  CheckCircle2,
  Copy,
  Bot,
  User,
  Lightbulb,
} from 'lucide-react';
import { toast } from 'sonner';

interface AITutorClientProps {
  user: any;
  initialConversations: any[];
}

export function AITutorClient({ user, initialConversations }: AITutorClientProps) {
  const [mode, setMode] = useState<string>('CONVERSATION');
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: 'ASSISTANT',
      content:
        'Hello! I am your ShikhoPath AI English Tutor. You can practice conversational English, ask questions about grammar rules, request sentence corrections, or analyze IELTS Writing prompts.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tutorModes = [
    { key: 'CONVERSATION', label: 'Conversation Partner', icon: MessageSquare },
    { key: 'GRAMMAR', label: 'Grammar Teacher', icon: BookOpen },
    { key: 'SENTENCE_CORRECTION', label: 'Sentence Fixer', icon: CheckCircle2 },
    { key: 'IELTS_WRITING', label: 'IELTS Examiner', icon: Award },
  ];

  const suggestedPrompts = [
    'How do I naturally introduce myself in a professional job interview?',
    'Explain the precise difference between Present Perfect and Past Simple.',
    'Check this sentence for grammatical mistakes: "He don\'t know about that."',
    'Give me 5 high-scoring IELTS Academic synonyms for "Important".',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const newMsgs = [...messages, { role: 'USER', content: text }];
    setMessages(newMsgs);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      setMessages([...newMsgs, { role: 'ASSISTANT', content: data.reply }]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Error reaching AI tutor';
      setMessages([
        ...newMsgs,
        {
          role: 'ASSISTANT',
          content: `⚠️ ${errMsg}`,
        },
      ]);
      toast.error('Could not reach AI Tutor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Response copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Modes Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0F172A] dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#5B4AE6]" />
            <span>AI Personal English Tutor</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
            Interactive AI assistant for conversation practice, structural sentence feedback, and IELTS band scoring.
          </p>
        </div>

        {/* Mode Selector Chips */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] shadow-2xs">
          {tutorModes.map((m) => {
            const Icon = m.icon;
            const isSelected = mode === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#5B4AE6] text-white shadow-2xs'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/80 hover:text-[#0F172A] dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Box */}
      <Card className="border-[#DDD8FA] dark:border-[#1F2937] shadow-xs flex flex-col h-[580px] sm:h-[620px] bg-white dark:bg-[#111827] rounded-3xl overflow-hidden">
        {/* Messages Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            const isBot = msg.role === 'ASSISTANT';
            return (
              <div
                key={index}
                className={`flex gap-3 max-w-2xl ${
                  isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-2xs ${
                    isBot ? 'bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF]' : 'bg-[#0F172A] dark:bg-slate-700'
                  }`}
                >
                  {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                    isBot
                      ? 'bg-[#F8FAFC] dark:bg-[#1E293B]/70 border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC]'
                      : 'bg-[#5B4AE6] text-white shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>

                  {isBot && (
                    <button
                      onClick={() => copyToClipboard(msg.content, index)}
                      className="absolute top-2 right-2 p-1 rounded-md text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-white dark:hover:bg-[#1E293B] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Copy response"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 mr-auto">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5B4AE6] to-[#7C69EF] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#1E293B]/70 border border-[#E2E8F0] dark:border-[#334155] flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#5B4AE6] animate-ping" />
                <span>AI Tutor is formulating response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        <div className="p-3 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-[#F8FAFC] dark:bg-[#0B0F19] flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-black text-[#5B4AE6] dark:text-indigo-400 shrink-0 flex items-center gap-1 uppercase tracking-wider">
            <Lightbulb className="w-3 h-3" /> Prompts:
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] text-[11px] font-medium text-[#475569] dark:text-[#CBD5E1] hover:border-[#5B4AE6] hover:text-[#5B4AE6] dark:hover:text-indigo-300 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3.5 sm:p-4 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#111827]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask in ${tutorModes.find((m) => m.key === mode)?.label} mode...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl border border-[#E2E8F0] dark:border-[#334155] text-xs sm:text-sm bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6] placeholder:text-[#94A3B8]"
            />
            <Button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="h-11 px-5 rounded-2xl font-bold gap-2 cursor-pointer shadow-xs"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
