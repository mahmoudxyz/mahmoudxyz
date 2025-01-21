import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Download, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const JSONLCreator = () => {
  const [examples, setExamples] = useState([
    { user: '', preferred: '', nonPreferred: '' }
  ]);
  const [error, setError] = useState('');

  const addExample = () => {
    setExamples([...examples, { user: '', preferred: '', nonPreferred: '' }]);
  };

  const removeExample = (index) => {
    const newExamples = examples.filter((_, i) => i !== index);
    setExamples(newExamples);
  };

  const updateExample = (index, field, value) => {
    const newExamples = [...examples];
    newExamples[index][field] = value;
    setExamples(newExamples);
  };

  const validateExamples = () => {
    for (let i = 0; i < examples.length; i++) {
      const example = examples[i];
      if (!example.user || !example.preferred || !example.nonPreferred) {
        setError(`Example ${i + 1} has empty fields`);
        return false;
      }
    }
    setError('');
    return true;
  };

  const exportJSONL = () => {
    if (!validateExamples()) return;

    const jsonlContent = examples
      .map(example => {
        const dpoExample = {
          input: {
            messages: [
              {
                role: "user",
                content: example.user
              }
            ],
            tools: [],
            parallel_tool_calls: true
          },
          preferred_output: [
            {
              role: "assistant",
              content: example.preferred
            }
          ],
          non_preferred_output: [
            {
              role: "assistant",
              content: example.nonPreferred
            }
          ]
        };
        return JSON.stringify(dpoExample);
      })
      .join('\n');

    const blob = new Blob([jsonlContent], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dpo_training_data.jsonl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>DPO Training Data Creator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {examples.map((example, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Example {index + 1}</h3>
                  {examples.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExample(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      User Message
                    </label>
                    <Textarea
                      value={example.user}
                      onChange={(e) => updateExample(index, 'user', e.target.value)}
                      placeholder="Enter user message (e.g., 'Generate a workflow that logs Hello World every 5 seconds')"
                      className="h-20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preferred Output (Good Workflow JSON)
                    </label>
                    <Textarea
                      value={example.preferred}
                      onChange={(e) => updateExample(index, 'preferred', e.target.value)}
                      placeholder="Enter the well-structured workflow JSON with proper component configurations"
                      className="h-32 font-mono"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Non-Preferred Output (Bad Workflow JSON)
                    </label>
                    <Textarea
                      value={example.nonPreferred}
                      onChange={(e) => updateExample(index, 'nonPreferred', e.target.value)}
                      placeholder="Enter the poorly structured workflow JSON with mistakes or missing configurations"
                      className="h-32 font-mono"
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="flex gap-4">
              <Button
                onClick={addExample}
                variant="outline"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Example
              </Button>
              
              <Button
                onClick={exportJSONL}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export JSONL
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JSONLCreator;