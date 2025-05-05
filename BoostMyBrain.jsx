import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Brain, ClipboardList, Music, TimerReset, FileUp } from "lucide-react";
import { motion } from "framer-motion";

const challenges = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  title: `Challenge ${i + 1}`,
  task: `This is a custom executive task for Day ${i + 1}.`,
  why: `This helps develop executive function skill ${i + 1}.`,
  reflectionPrompt: `Reflect on your experience from Day ${i + 1}.`
}));

export default function BoostMyBrain() {
  const [currentDay, setCurrentDay] = useState(1);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('xp')) || 0);
  const [completedDays, setCompletedDays] = useState(() => {
    const stored = localStorage.getItem('completedDays');
    return stored ? JSON.parse(stored) : [];
  });
  const [toolboxOpen, setToolboxOpen] = useState(false);
  const [journal, setJournal] = useState(() => localStorage.getItem('journal') || '');
  const [parentExport, setParentExport] = useState('');

  const completeToday = () => {
    if (!completedDays.includes(currentDay)) {
      const newXp = xp + 10;
      const newCompleted = [...completedDays, currentDay];
      setXp(newXp);
      setCompletedDays(newCompleted);
      localStorage.setItem('xp', newXp);
      localStorage.setItem('completedDays', JSON.stringify(newCompleted));
    }
  };

  const handleJournalChange = (e) => {
    const newJournal = e.target.value;
    setJournal(newJournal);
    localStorage.setItem('journal', newJournal);
  };

  const exportParentSummary = () => {
    const summary = {
      XP: xp,
      Completed_Days: completedDays,
      Journal: journal,
    };
    setParentExport(JSON.stringify(summary, null, 2));
  };

  const currentChallenge = challenges.find((c) => c.day === currentDay);
  const progressPercent = Math.round((completedDays.length / challenges.length) * 100);

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <Brain className="text-blue-400" /> Boost My Brain
        </h1>

        <div className="mb-4">
          <Progress value={progressPercent} className="h-3 bg-zinc-700" />
          <p className="text-sm text-gray-300 mt-1">Progress: {progressPercent}%</p>
        </div>

        <Card className="bg-zinc-800 border border-zinc-700">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2">Day {currentChallenge.day}: {currentChallenge.title}</h2>
            <p className="mb-2 text-blue-300">✅ Task: {currentChallenge.task}</p>
            <p className="mb-2 text-green-300">🧠 Why: {currentChallenge.why}</p>
            <p className="mb-2 text-purple-300">✍️ Reflect: {currentChallenge.reflectionPrompt}</p>
            {!completedDays.includes(currentDay) ? (
              <Button onClick={completeToday} className="mt-3">Mark Complete</Button>
            ) : (
              <div className="text-sm text-yellow-300 flex items-center gap-1 mt-3">
                <BadgeCheck className="w-4 h-4" /> Completed
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between items-center">
          <Button onClick={() => setCurrentDay(Math.max(currentDay - 1, 1))} disabled={currentDay === 1}>Previous</Button>
          <span>Day {currentDay} of {challenges.length}</span>
          <Button onClick={() => setCurrentDay(Math.min(currentDay + 1, challenges.length))} disabled={currentDay === challenges.length}>Next</Button>
        </div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-8 text-center text-lg text-cyan-400"
        >
          🧠 XP: {xp} points
        </motion.div>

        <div className="mt-10">
          <Button variant="secondary" onClick={() => setToolboxOpen(!toolboxOpen)}>
            {toolboxOpen ? 'Hide Toolbox' : 'Open Toolbox'}
          </Button>
          {toolboxOpen && (
            <div className="mt-4 space-y-4">
              <Card className="bg-zinc-800 border border-zinc-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><ClipboardList className="text-orange-400" /> Morning Checklist</h3>
                  <ul className="list-disc ml-5 text-sm text-gray-300">
                    <li>Brush teeth</li>
                    <li>Eat breakfast</li>
                    <li>Pack school bag</li>
                    <li>Check today’s task</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border border-zinc-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><TimerReset className="text-red-400" /> Timer</h3>
                  <p className="text-sm">Try this quick timer: <a className="text-blue-400 underline" href="https://www.youtube.com/watch?v=GgT4bXhKItQ" target="_blank" rel="noreferrer">2-Minute Focus Timer</a></p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border border-zinc-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><Music className="text-green-400" /> Focus Playlist</h3>
                  <iframe width="100%" height="80" src="https://www.youtube.com/embed/videoseries?list=PLVjVRY5SCa0_klxT4ttTHrp7MdzPt1AJX" title="Focus Music" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border border-zinc-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">📝 Reflection Log</h3>
                  <textarea
                    className="w-full p-2 bg-zinc-700 text-white rounded"
                    rows={5}
                    placeholder="Write your thoughts here..."
                    value={journal}
                    onChange={handleJournalChange}
                  />
                </CardContent>
              </Card>

              <Card className="bg-zinc-800 border border-zinc-700">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2"><FileUp className="text-yellow-400" /> Parent Export</h3>
                  <Button onClick={exportParentSummary}>Export Summary</Button>
                  {parentExport && (
                    <pre className="mt-2 text-sm bg-zinc-700 p-2 rounded overflow-x-auto whitespace-pre-wrap break-words">{parentExport}</pre>
                  )}
                </CardContent>
              </Card>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
