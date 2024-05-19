import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';


export const CouldDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://taskmasterapi.vercel.app/tasks/could');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Box className="w-full sm:w-1/2">
      <Box className="relative z-1 h-full ml-0 md:mr-10">
        <span className="absolute z-1 top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
        <Link to="/could-do-list">
          <Box className="relative z-1 h-full p-5 bg-white border-2 border-green-500 rounded-lg">
            <Box className="flex items-center -mt-1">
              <Typography 
                variant="h3"
                sx={{
                  fontSize: "14px",
                  fontWeight: 600
                }} 
                className="my-2 ml-3 text-lg font-bold text-gray-800"
              >
                Could Do List
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              paragraph 
              className="mt-1 mb-1 text-xs font-medium text-green-500 uppercase"
            >
              ------------
            </Typography>
            {loading ? (
              <Typography
                variant="h6"
                paragraph
                className="mb-2 text-gray-600"
                sx={{
                  fontSize: "16px",
                  fontWeight: 300
                }}
              >
                Loading...
              </Typography>
            ) : tasks.length === 0 ? (
              <Typography
                variant="h6"
                paragraph
                className="mb-2 text-gray-600"
                sx={{
                  fontSize: "16px",
                  fontWeight: 300
                }}
              >
                It appears your list is empty
                <span className="inline pl-3">
                  <Link to="/new-task">
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      color="primary"
                      className="mt-10 inline text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#6ec2e3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4291B0]"
                    >
                      Add New
                    </Button>
                  </Link>
                </span>
              </Typography>
            ) : (
              tasks.map((task) => (
                <Typography
                  key={task._id}
                  variant="h6"
                  paragraph
                  className="mb-2 text-gray-600"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 300
                  }}
                >
                  {task.name}
                </Typography>
              ))
            )}
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default CouldDoList;
