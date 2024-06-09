"use client";


import { useEffect, useState } from 'react';
import ChatCompletionRequestMessage from "openai"
import { Button } from "@/components/*/ui/button";
import { Input } from '@/components/*/ui/input';
import { SearchIcon, X } from "lucide-react";



const DailyTrends = () => {
  const [data, setData] = useState<any[]>([]);
  const [aidata, setAIData] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [section2, setSection2] = useState<any[]>([]);
  const [loading, seLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<any>();
  const [value, setValue] = useState("");
  const [showResults, setShowResults] = useState<boolean>(false); // State to show/hide results
  const [typingIndex, setTypingIndex] = useState<number>(0); // State for typing animation


  useEffect(() => {
    fetch('/api/gtrend')
      .then((response) => response.json())
      .then((res) => {
        debugger
        if (res?.default?.trendingSearchesDays) {
          setData(res?.default?.trendingSearchesDays[0]?.trendingSearches);
        }
      })
      .catch((error) => setError(error.message));
  }, []);

  const onClear = () => {
    setValue("");
  }

  const fetchData = () => {
    fetch('/api/chatai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        const content = data.choices[0].message.content;
        const contentList = content.split('\n').map((item: string) => item.trim()).filter((item: string) => item);
        setAIData(contentList);
      })
      .catch((error) => setError(error.message));
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }
  const handleSection1 = (props: any) => {
    setSection2(props.articles);
  }

  const handleSection2 = (props: any) => {
    // console.log(props.url);
    setMessage({ message: { role: "user", content: "read this article" + props.url + " and suggest me some streaming ideas to stream on my channel" } });
    // console.log(JSON.stringify(message));

  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex space-x-4">
        <div className="flex-1 max-w-2xl p-4 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">Trending Topics</h1>
          <ul className="space-y-2">
            {data.length > 0 && data?.map((topic, index) => (
              <li
                key={index}
                onClick={() => handleSection1(topic)}
                className="font-semibold p-4 rounded-lg shadow hover:bg-gray-200 transition text-white bg-[#252731]">
                {topic.title.query}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 max-w-2xl p-4 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">Related Details</h1>
          {/* Content for the second section */}
          {/* <div className="flex-1 max-w-2xl p-4  rounded-lg shadow"> */}
          {/* <h1 className="text-3xl font-bold mb-4">Trending Topics</h1> */}
          <ul className="space-y-2">
            {section2.length > 0 && section2?.map((topic, index) => (
              <li
                key={index}
                onClick={() => handleSection2(topic)}
                className="font-semibold p-4 rounded-lg shadow hover:bg-gray-200 transition text-white bg-[#252731]">
                {topic.title}
              </li>
            ))}
          </ul>
          {/* </div> */}
        </div>
        <div className="flex-1 max-w-2xl p-4 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">Ask AI Suggestions</h1>
          {/* Content for the third section */}
          {/* <textarea disabled
          className='w-full p-3'/> */}
          <div className="relative w-full lg:w-2/4 lg:mr-2 flex items-center">
            <Input disabled placeholder="Search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" value={value}
              onChange={(e) => { setValue(e.target.value) }} />
            <Button type="submit" size="sm" variant="secondary" className="rounded-l-none" onClick={fetchData}>
              <SearchIcon className="h-5 w-f text-muted-foreground" />
            </Button>
          </div>
          
            <div>
              <h2 className="text-2xl font-bold mt-4">Results</h2>
              {/* {aidata.length > 0 && ( */}
                <ul className="mt-2 space-y-2 p-4 rounded-lg shadow">
                  {aidata.map((item, index) => (
                    <li key={index} className="font-semibold p-4 rounded-lg shadow hover:bg-gray-200 transition text-white bg-[#252731]" >
                      {item}
                    </li>
                  ))}
                </ul>
              {/* )} */}
            </div>
          
          
          {/* <Button variant="secondary" onClick={fetchData}>
             Fetch Streaming Ideas
          </Button> */}

          {/* <form className="relative w-full lg:w-2/4 lg:mr-2 flex items-center" onSubmit={fetchData}>
            <Input disabled placeholder="Search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" value={value}
              onChange={(e) => { setValue(e.target.value) }} />
            {value && (<X className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:placeholder-opacity-75
             transition" onClick={onClear} />)}
            <Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
              <SearchIcon className="h-5 w-f text-muted-foreground" />
            </Button>
          </form> */}

          <div>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTrends;
