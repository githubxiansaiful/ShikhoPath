'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Target, Clock, CheckCircle2, Plus, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface StudyTask {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  day: string;
}

interface StudyPlanClientProps {
  user: any;
  initialPlan: any;
}

export function StudyPlanClient({ user, initialPlan }: StudyPlanClientProps) {
  const [dailyMinutes] = useState(user?.profile?.dailyTimeMinutes || 30);
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    if (initialPlan?.tasks && initialPlan.tasks.length > 0) {
      return initialPlan.tasks.map((t: any): StudyTask => ({
        id: t.id,
        title: t.title,
        time: `${t.targetMinutes || 15}m`,
        completed: !!t.isCompleted,
        day: 'Today',
      }));
    }
    return [
      { id: '1', title: 'Grammar: Present Simple vs Present Continuous', time: '15m', completed: false, day: 'Today' },
      { id: '2', title: 'Vocabulary: 5 High-Yield Academic Words', time: '10m', completed: false, day: 'Today' },
      { id: '3', title: 'IELTS Academic Reading Passage 1 Practice', time: '20m', completed: false, day: 'Tomorrow' },
      { id: '4', title: 'AI Speaking Partner: 5-minute Free Conversation', time: '10m', completed: false, day: 'Thursday' },
    ];
  });

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t: StudyTask) => {
        if (t.id === id) {
          const nextVal = !t.completed;
          if (nextVal) {
            toast.success(`Completed: "${t.title}"`);
          }
          return { ...t, completed: nextVal };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        time: '15m',
        completed: false,
        day: 'Today',
      },
    ]);
    toast.success('New study action item added!');
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] dark:text-white flex items-center gap-2 tracking-tight">
          <Calendar className="w-6 h-6 text-[#5B4AE6]" />
          <span>Personal Study Planner</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-1">
          Structure your learning journey with realistic daily milestones and target-driven tracking.
        </p>
      </div>

      {/* Target Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 shadow-xs">
          <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#5B4AE6]" /> Target Goal
          </span>
          <div className="text-lg font-black text-[#0F172A] dark:text-white mt-1.5">
            {user?.profile?.learningGoal || 'IELTS Band 7.5+'}
          </div>
        </Card>

        <Card className="p-5 shadow-xs">
          <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#10B981]" /> Daily Study Target
          </span>
          <div className="text-lg font-black text-[#0F172A] dark:text-white mt-1.5">
            {dailyMinutes} Minutes / Day
          </div>
        </Card>

        <Card className="p-5 shadow-xs">
          <span className="text-xs font-bold text-[#64748B] dark:text-[#94A3B8] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#4535C5] dark:text-indigo-400" /> Current Level
          </span>
          <div className="text-lg font-black text-[#0F172A] dark:text-white mt-1.5">
            {user?.profile?.currentLevel || 'Intermediate'}
          </div>
        </Card>
      </div>

      {/* Study Routine Tasks */}
      <Card className="shadow-xs">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-[#0F172A] dark:text-white">
              Weekly Schedule & Action Items
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Check off tasks as you finish them each day.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Add custom task */}
          <form onSubmit={handleAddTask} className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new study task (e.g. Practice 10 irregular verbs)..."
              className="flex-1 px-3.5 py-2.5 border border-[#E2E8F0] dark:border-[#1F2937] rounded-xl text-xs sm:text-sm bg-white dark:bg-[#111827] text-[#0F172A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-[#5B4AE6]"
            />
            <Button type="submit" size="sm" className="font-bold text-xs gap-1 cursor-pointer shrink-0">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
          </form>

          {/* Task list */}
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  task.completed
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-[#F8FAFC] dark:bg-[#111827] border-[#E2E8F0] dark:border-[#1F2937] hover:border-[#5B4AE6] dark:hover:border-[#5B4AE6]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                      task.completed
                        ? 'bg-[#10B981] border-[#10B981] text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1A2234]'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      task.completed ? 'line-through text-[#94A3B8] dark:text-slate-500' : 'text-[#0F172A] dark:text-white'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-[10px]">
                    {task.day}
                  </Badge>
                  <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono font-medium">{task.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
