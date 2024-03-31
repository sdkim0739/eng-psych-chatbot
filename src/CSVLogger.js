// CSVLogger.js
import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver'; // Import file-saver library for saving CSV file

const CSVLogger = ({ participantId, conditionId, interactions }) => {
  const [csvData, setCSVData] = useState([]);

  // Function to add interaction to CSV data
  const addInteractionToCSV = (interaction) => {
    setCSVData([...csvData, interaction]);
  };

  // Function to save CSV file
  const saveCSVFile = () => {
    const csvContent = csvData
      .map((interaction) => Object.values(interaction).join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `chatlog_${participantId}_${conditionId}.csv`);
  };

  // Save CSV file when csvData changes
  useEffect(() => {
    if (csvData.length > 0) {
      saveCSVFile();
    }
  }, [csvData]);

  // Add interaction to CSV data when interactions change
  useEffect(() => {
    if (interactions) {
      addInteractionToCSV(interactions);
    }
  }, [interactions]);

  return null; // This component doesn't render anything visible
};

export default CSVLogger;
