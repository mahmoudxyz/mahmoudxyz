import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Download, PlusCircle, Trash2, ArrowRight } from 'lucide-react';

const nodeTypes = {
  timer: {
    name: "Timer",
    logo: "timer",
    category: "COMPONENT",
    defaultConfig: {
      uri: "timer1",
      period: "1000",
      fixedRate: "true",
      repeatCount: "1"
    }
  },
  http: {
    name: "HTTP",
    logo: "world",
    category: "component",
    defaultConfig: {
      uri: "",
      method: "GET",
      secure: "true",
      queryParams: {},
      requestBody: ""
    }
  },
  chatgpt: {
    name: "ChatGPT",
    logo: "chatgpt",
    category: "component",
    defaultConfig: {
      model: "gpt-3.5-turbo-1106",
      memory: "true",
      chatgpt: "",
      question: "",
      "response-format": "text"
    }
  },
  sql: {
    name: "SQL",
    logo: "sql",
    category: "COMPONENT",
    defaultConfig: {
      query: "${body}",
      dynamic: "true",
      datasource: ""
    }
  },
  log: {
    name: "Log",
    logo: "log",
    category: "EIP",
    defaultConfig: {
      uri: "${body}"
    }
  },
  setBody: {
    name: "Set Body",
    logo: "change",
    category: "EIP",
    defaultConfig: {
      expression: ""
    }
  },
  split: {
    name: "Split",
    logo: "cut",
    category: "EIP",
    defaultConfig: {
      expression: ""
    }
  }
};

const WorkflowJSONLCreator = () => {
  const [workflows, setWorkflows] = useState([{
    router_id: window.crypto.randomUUID(),
    description: null,
    workflowId: window.crypto.randomUUID(),
    indexOrder: 1,
    nodes: [],
    edges: []
  }]);

  const addNode = (workflowIndex) => {
    const newNode = {
      id: window.crypto.randomUUID(),
      type: "",
      selected: false,
      data: {
        name: "",
        logo: "",
        description: null,
        config: {},
        type: "",
        category: "",
        connections: {
          source: true,
          target: true
        }
      },
      position: {
        x: 200 + Math.random() * 300,
        y: 100 + Math.random() * 200
      }
    };

    const updatedWorkflows = [...workflows];
    updatedWorkflows[workflowIndex].nodes.push(newNode);
    setWorkflows(updatedWorkflows);
  };

  const updateNodeType = (workflowIndex, nodeIndex, type) => {
    const updatedWorkflows = [...workflows];
    const node = updatedWorkflows[workflowIndex].nodes[nodeIndex];
    const nodeType = nodeTypes[type];

    node.type = type;
    node.data = {
      ...node.data,
      name: nodeType?.name || "",
      logo: nodeType?.logo || "",
      type: type,
      category: nodeType?.category || "",
      config: nodeType ? { ...nodeType.defaultConfig } : {},
      connections: {
        source: true,
        target: true
      }
    };
    
    setWorkflows(updatedWorkflows);
  };

  const updateNodeConfig = (workflowIndex, nodeIndex, field, value) => {
    const updatedWorkflows = [...workflows];
    const node = updatedWorkflows[workflowIndex].nodes[nodeIndex];
    node.data.config[field] = value;
    setWorkflows(updatedWorkflows);
  };

  const addEdge = (workflowIndex) => {
    const newEdge = {
      id: window.crypto.randomUUID(),
      source: "",
      target: ""
    };

    const updatedWorkflows = [...workflows];
    updatedWorkflows[workflowIndex].edges.push(newEdge);
    setWorkflows(updatedWorkflows);
  };

  const updateEdge = (workflowIndex, edgeIndex, field, value) => {
    const updatedWorkflows = [...workflows];
    updatedWorkflows[workflowIndex].edges[edgeIndex][field] = value;
    setWorkflows(updatedWorkflows);
  };

  const removeNode = (workflowIndex, nodeIndex) => {
    const updatedWorkflows = [...workflows];
    const nodeToRemove = updatedWorkflows[workflowIndex].nodes[nodeIndex];
    
    // Remove the node
    updatedWorkflows[workflowIndex].nodes.splice(nodeIndex, 1);
    
    // Remove related edges
    updatedWorkflows[workflowIndex].edges = updatedWorkflows[workflowIndex].edges.filter(
      edge => edge.source !== nodeToRemove.id && edge.target !== nodeToRemove.id
    );
    
    setWorkflows(updatedWorkflows);
  };

  const removeEdge = (workflowIndex, edgeIndex) => {
    const updatedWorkflows = [...workflows];
    updatedWorkflows[workflowIndex].edges.splice(edgeIndex, 1);
    setWorkflows(updatedWorkflows);
  };

  const addWorkflow = () => {
    setWorkflows([...workflows, {
      router_id: window.crypto.randomUUID(),
      description: null,
      workflowId: window.crypto.randomUUID(),
      indexOrder: workflows.length + 1,
      nodes: [],
      edges: []
    }]);
  };

  const exportJSONL = () => {
    const jsonlContent = workflows.map(workflow => JSON.stringify(workflow)).join('\n');
    const blob = new Blob([jsonlContent], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workflow.jsonl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Workflow JSONL Creator</CardTitle>
        </CardHeader>
        <CardContent>
          {workflows.map((workflow, workflowIndex) => (
            <Card key={workflow.router_id} className="mb-6 p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Workflow {workflowIndex + 1}</h3>
                  <div className="space-x-2">
                    <Button onClick={() => addNode(workflowIndex)} variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Node
                    </Button>
                    <Button onClick={() => addEdge(workflowIndex)} variant="outline" size="sm">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Add Edge
                    </Button>
                  </div>
                </div>

                {/* Nodes Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Nodes</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {workflow.nodes.map((node, nodeIndex) => (
                      <Card key={node.id} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="font-medium">Node {nodeIndex + 1}</h5>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeNode(workflowIndex, nodeIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <RadioGroup
                            value={node.data.type || ""}
                            onValueChange={(value) => updateNodeType(workflowIndex, nodeIndex, value)}
                            className="grid grid-cols-2 gap-4"
                          >
                            {Object.entries(nodeTypes).map(([type, config]) => (
                              <div key={type} className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value={type} id={`${node.id}-${type}`} />
                                <Label htmlFor={`${node.id}-${type}`} className="cursor-pointer flex-1">
                                  <div className="font-medium">{config.name}</div>
                                  <div className="text-sm text-gray-500">{config.category}</div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>

                          {node.data.type && (
                            <div className="space-y-2">
                              {Object.entries(node.data.config).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <label className="text-sm font-medium">{key}</label>
                                  {typeof value === 'boolean' || value === 'true' || value === 'false' ? (
                                    <div className="flex items-center space-x-2">
                                      <Switch
                                        checked={value === true || value === 'true'}
                                        onCheckedChange={(checked) => 
                                          updateNodeConfig(workflowIndex, nodeIndex, key, String(checked))
                                        }
                                      />
                                      <span className="text-sm text-gray-500">
                                        {value === true || value === 'true' ? 'Enabled' : 'Disabled'}
                                      </span>
                                    </div>
                                  ) : key === 'question' || key === 'query' ? (
                                    <Textarea
                                      value={value}
                                      onChange={(e) => 
                                        updateNodeConfig(workflowIndex, nodeIndex, key, e.target.value)
                                      }
                                      placeholder={`Enter ${key}`}
                                      className="h-32"
                                    />
                                  ) : (
                                    <Input
                                      value={value}
                                      onChange={(e) => 
                                        updateNodeConfig(workflowIndex, nodeIndex, key, e.target.value)
                                      }
                                      placeholder={`Enter ${key}`}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Edges Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Edges</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {workflow.edges.map((edge, edgeIndex) => (
                      <Card key={edge.id} className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="font-medium">Edge {edgeIndex + 1}</h5>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeEdge(workflowIndex, edgeIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <Select
                            value={edge.source || ""}
                            onValueChange={(value) => updateEdge(workflowIndex, edgeIndex, 'source', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select source node">
                                {edge.source ? `Node ${workflow.nodes.findIndex(n => n.id === edge.source) + 1} - ${workflow.nodes.find(n => n.id === edge.source)?.data.name || 'Unnamed'}` : "Select source node"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {workflow.nodes.map((node, idx) => (
                                <SelectItem key={node.id} value={node.id}>
                                  Node {idx + 1} - {node.data.name || 'Unnamed'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={edge.target || ""}
                            onValueChange={(value) => updateEdge(workflowIndex, edgeIndex, 'target', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select target node">
                                {edge.target ? `Node ${workflow.nodes.findIndex(n => n.id === edge.target) + 1} - ${workflow.nodes.find(n => n.id === edge.target)?.data.name || 'Unnamed'}` : "Select target node"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {workflow.nodes.map((node, idx) => (
                                <SelectItem key={node.id} value={node.id}>
                                  Node {idx + 1} - {node.data.name || 'Unnamed'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <div className="flex gap-4 mt-6">
            <Button
              onClick={addWorkflow}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Workflow
            </Button>

            <Button
              onClick={exportJSONL}
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Export JSONL
            </Button>
          </div>

          {/* Preview Section */}
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
                  {JSON.stringify(workflows, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowJSONLCreator;