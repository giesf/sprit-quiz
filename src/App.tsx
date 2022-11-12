import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QuizRoot } from './components/QuizRoot';
import { SetManager } from './components/SetManager';
import { QuestionTable } from './components/QuestionTable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Question } from './components/Question';
import { PlayControls } from './components/PlayControls';
import { ExternalWindow } from './components/ExternalWindow';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <QuizRoot>
        <Tabs>
          <TabList style={{ marginBottom: 0 }}>
            <Tab>Edit Questions</Tab>
            <Tab>Play</Tab>
          </TabList>

          <TabPanel style={{ backgroundColor: '#fff', padding: 16 }}>
            <SetManager />
            <QuestionTable />
          </TabPanel>
          <TabPanel>
            <ErrorBoundary>
              <PlayControls />

              <Question />
            </ErrorBoundary>
          </TabPanel>
        </Tabs>
        <ExternalWindow />
      </QuizRoot>
    </div >
  );
}

export default App;
