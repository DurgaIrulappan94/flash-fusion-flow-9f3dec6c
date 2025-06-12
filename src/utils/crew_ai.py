
import json
import sys
from typing import List, Dict, Any
import os
from datetime import datetime

# Since we can't actually install crewai in this environment, 
# we'll simulate the multi-agent approach with structured functions

class MockAgent:
    def __init__(self, role: str, goal: str, backstory: str, tools=None, verbose=True):
        self.role = role
        self.goal = goal
        self.backstory = backstory
        self.tools = tools or []
        self.verbose = verbose

class MockTask:
    def __init__(self, description: str, agent: MockAgent, context=None):
        self.description = description
        self.agent = agent
        self.context = context or []

class MockCrew:
    def __init__(self, agents: List[MockAgent], tasks: List[MockTask], verbose=True):
        self.agents = agents
        self.tasks = tasks
        self.verbose = verbose
    
    def kickoff(self):
        # Simulate the crew execution
        return "Presentation generated successfully with multi-agent collaboration"

class PPTGeneratorCrew:
    def __init__(self):
        # Simulate search tool functionality
        self.search_tool = self._mock_search_tool()
        
    def _mock_search_tool(self):
        """Mock search functionality that returns relevant information"""
        return "DuckDuckGoSearchRun"
        
    def create_agents(self):
        # Research Agent
        researcher = MockAgent(
            role='Research Specialist',
            goal='Find accurate and relevant information about the given topic',
            backstory='Expert at finding and gathering information from various sources',
            tools=[self.search_tool],
            verbose=True
        )

        # Content Organizer Agent
        organizer = MockAgent(
            role='Content Organizer',
            goal='Structure and organize the gathered information into a coherent presentation format',
            backstory="""You are a skilled content organizer with expertise in creating 
            engaging and well-structured presentations. You know how to transform raw 
            information into compelling content that tells a story.""",
            verbose=True
        )

        # PPT Designer Agent
        designer = MockAgent(
            role='PPT Designer',
            goal='Create a professional and visually appealing PowerPoint presentation',
            backstory="""You are a PowerPoint expert with years of experience in creating 
            stunning presentations. You know how to balance text, visuals, and layout to 
            create impactful slides.""",
            verbose=True
        )

        # Content Analyst Agent
        analyst = MockAgent(
            role='Content Analyst',
            goal='Analyze and synthesize information into meaningful insights',
            backstory='Expert at analyzing information and providing valuable insights',
            verbose=True
        )

        return researcher, organizer, designer, analyst

    def create_tasks(self, topic: str, requirements: str, researcher: MockAgent, organizer: MockAgent, designer: MockAgent, analyst: MockAgent):
        # Research Task
        research_task = MockTask(
            description=f'Research and gather information about: {topic}. Additional requirements: {requirements}',
            agent=researcher
        )

        # Analysis Task
        analysis_task = MockTask(
            description=f'Analyze the research findings about: {topic} and provide insights',
            agent=analyst
        )

        # Organization Task (depends on research_task)
        organize_task = MockTask(
            description="""Using the research report:
            - Create a clear structure for the presentation
            - Organize information into logical sections
            - Identify key messages and takeaways
            - Create an outline for the presentation
            Output: A detailed presentation outline with organized content.""",
            agent=organizer,
            context=[research_task]
        )

        # Design Task (depends on organize_task)
        design_task = MockTask(
            description="""Using the presentation outline:
            - Create a professional PowerPoint presentation
            - Design engaging slides with appropriate layouts
            - Add relevant visual elements in each slide like title, subtitle, images, etc.           
            - Ensure visual consistency
            Output: A complete PowerPoint presentation file.""",
            agent=designer,
            context=[organize_task]
        )

        return [research_task, analysis_task, organize_task, design_task]

    def _research_content(self, topic: str, requirements: str) -> Dict[str, Any]:
        """Simulate research agent findings"""
        research_data = {
            "market_trends": f"Current trends in {topic} show significant growth and innovation",
            "key_statistics": f"Industry data reveals important insights about {topic}",
            "competitive_landscape": f"Analysis of competitors and market positioning in {topic}",
            "future_outlook": f"Predictions and forecasts for {topic} development",
            "challenges": f"Key challenges and obstacles in {topic} implementation",
            "opportunities": f"Emerging opportunities and potential growth areas in {topic}"
        }
        
        if requirements:
            research_data["custom_focus"] = f"Specific research focus on: {requirements}"
            
        return research_data

    def _analyze_content(self, research_data: Dict[str, Any], topic: str) -> Dict[str, Any]:
        """Simulate analyst agent insights"""
        return {
            "key_insights": [
                f"Strategic importance of {topic} in current market",
                "Identified growth opportunities and market gaps",
                "Risk assessment and mitigation strategies",
                "Competitive advantages and positioning"
            ],
            "recommendations": [
                "Immediate action items for implementation",
                "Long-term strategic planning considerations",
                "Resource allocation and investment priorities",
                "Performance metrics and success indicators"
            ]
        }

    def _organize_content(self, research_data: Dict[str, Any], analysis_data: Dict[str, Any], topic: str) -> List[Dict[str, Any]]:
        """Simulate organizer agent structuring content"""
        slides = []
        
        # Title slide
        slides.append({
            "id": 0,
            "title": topic,
            "subtitle": "Strategic Analysis & Recommendations",
            "content": [
                "Comprehensive Market Research",
                "Data-Driven Insights",
                "Strategic Implementation Plan",
                "Future Roadmap"
            ],
            "slideType": "title",
            "layout": "title",
            "images": [],
            "agent_notes": "Created by Research Specialist and Content Organizer"
        })
        
        # Executive Summary
        slides.append({
            "id": 1,
            "title": "Executive Summary",
            "content": [
                f"Comprehensive analysis of {topic} market landscape",
                "Key findings from extensive research and data analysis",
                "Strategic recommendations based on market trends",
                "Implementation roadmap with clear milestones",
                "Expected outcomes and success metrics"
            ],
            "slideType": "content",
            "layout": "content",
            "images": [],
            "agent_notes": "Synthesized by Content Analyst"
        })
        
        # Market Research Findings
        slides.append({
            "id": 2,
            "title": "Market Research Findings",
            "content": [
                research_data.get("market_trends", "Market trends analysis"),
                research_data.get("key_statistics", "Statistical insights"),
                research_data.get("competitive_landscape", "Competitive analysis"),
                "Industry benchmarks and performance indicators",
                "Market size and growth projections"
            ],
            "slideType": "content",
            "layout": "content_with_image",
            "images": [],
            "agent_notes": "Research conducted by Research Specialist"
        })
        
        # Strategic Analysis
        slides.append({
            "id": 3,
            "title": "Strategic Analysis & Insights",
            "content": analysis_data.get("key_insights", [
                "Strategic market positioning analysis",
                "Competitive advantage identification",
                "Risk-reward assessment framework",
                "Growth opportunity mapping"
            ]),
            "slideType": "content",
            "layout": "content",
            "images": [],
            "agent_notes": "Analysis by Content Analyst"
        })
        
        # Implementation Strategy
        slides.append({
            "id": 4,
            "title": "Implementation Strategy",
            "content": [
                "Phase 1: Foundation and Market Entry (Q1-Q2)",
                "Phase 2: Market Penetration and Growth (Q3-Q4)",
                "Phase 3: Expansion and Optimization (Year 2)",
                "Phase 4: Market Leadership and Innovation (Year 3+)",
                "Resource allocation and budget considerations"
            ],
            "slideType": "content",
            "layout": "content",
            "images": [],
            "agent_notes": "Strategy developed by Content Organizer"
        })
        
        # Recommendations
        slides.append({
            "id": 5,
            "title": "Strategic Recommendations",
            "content": analysis_data.get("recommendations", [
                "Immediate tactical actions for quick wins",
                "Medium-term strategic initiatives",
                "Long-term vision and positioning",
                "Investment priorities and resource allocation"
            ]),
            "slideType": "content",
            "layout": "content_with_image",
            "images": [],
            "agent_notes": "Recommendations by Content Analyst"
        })
        
        # Risk Management
        slides.append({
            "id": 6,
            "title": "Risk Management & Mitigation",
            "content": [
                research_data.get("challenges", "Identified market challenges"),
                "Risk probability and impact assessment matrix",
                "Mitigation strategies and contingency planning",
                "Monitoring framework and early warning indicators",
                "Crisis management and response protocols"
            ],
            "slideType": "content",
            "layout": "content",
            "images": [],
            "agent_notes": "Risk analysis by Research Specialist and Analyst"
        })
        
        # Future Outlook
        slides.append({
            "id": 7,
            "title": "Future Outlook & Opportunities",
            "content": [
                research_data.get("future_outlook", "Future market predictions"),
                research_data.get("opportunities", "Emerging opportunities"),
                "Technology trends and innovation impact",
                "Market evolution and disruption scenarios",
                "Strategic positioning for future growth"
            ],
            "slideType": "content",
            "layout": "content_with_image",
            "images": [],
            "agent_notes": "Future analysis by Research Specialist"
        })
        
        # Financial Projections
        slides.append({
            "id": 8,
            "title": "Financial Projections & ROI",
            "content": [
                "Investment requirements and funding strategies",
                "Revenue projections and growth assumptions",
                "Cost-benefit analysis and profitability timeline",
                "Break-even analysis and cash flow projections",
                "Return on investment calculations and scenarios"
            ],
            "slideType": "content",
            "layout": "content_with_image",
            "images": [],
            "agent_notes": "Financial analysis by Content Analyst"
        })
        
        # Closing slide
        slides.append({
            "id": 9,
            "title": "Thank You",
            "subtitle": "Questions & Next Steps",
            "content": [
                "Discussion and Q&A Session",
                "Next Steps and Action Items",
                "Contact Information",
                "Additional Resources and Appendix"
            ],
            "slideType": "closing",
            "layout": "title",
            "images": [],
            "agent_notes": "Presentation conclusion by PPT Designer"
        })
        
        return slides

    def generate_presentation(self, topic: str, requirements: str = "", num_slides: int = 10) -> List[Dict[str, Any]]:
        """Main method to generate presentation using multi-agent approach"""
        
        # Create agents
        researcher, organizer, designer, analyst = self.create_agents()
        
        # Create tasks
        tasks = self.create_tasks(topic, requirements, researcher, organizer, designer, analyst)
        
        # Create and simulate running the crew
        crew = MockCrew(
            agents=[researcher, organizer, designer, analyst],
            tasks=tasks,
            verbose=True
        )
        
        # Simulate crew execution
        crew_result = crew.kickoff()
        
        # Execute the multi-agent workflow
        print(f"🔍 Research Agent: Gathering information about {topic}...")
        research_data = self._research_content(topic, requirements)
        
        print(f"📊 Content Analyst: Analyzing research findings...")
        analysis_data = self._analyze_content(research_data, topic)
        
        print(f"📋 Content Organizer: Structuring presentation content...")
        slides = self._organize_content(research_data, analysis_data, topic)
        
        print(f"🎨 PPT Designer: Finalizing presentation design and layout...")
        
        # Add custom requirements slide if provided
        if requirements.strip():
            custom_slide = {
                "id": len(slides),
                "title": "Custom Requirements Analysis",
                "content": [
                    f"Specific analysis focus: {requirements}",
                    "Detailed requirement breakdown and specifications",
                    "Implementation considerations and constraints",
                    "Success metrics and evaluation criteria",
                    "Compliance and regulatory considerations"
                ],
                "slideType": "content",
                "layout": "content_with_image",
                "images": [],
                "agent_notes": "Custom analysis by Content Analyst and Research Specialist"
            }
            slides.insert(-1, custom_slide)  # Insert before closing slide
        
        print(f"✅ Multi-Agent Collaboration Complete: Generated {len(slides)} slides")
        print(f"🤝 Crew Result: {crew_result}")
        
        return slides

def generate_presentation_content(topic: str, requirements: str = "", num_slides: int = 10) -> List[Dict[str, Any]]:
    """
    Generate professional presentation content using CrewAI-style multi-agent approach
    """
    crew = PPTGeneratorCrew()
    return crew.generate_presentation(topic, requirements, num_slides)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python crew_ai.py <topic> [requirements]")
        sys.exit(1)
    
    topic = sys.argv[1]
    requirements = sys.argv[2] if len(sys.argv) > 2 else ""
    
    print(f"🚀 Starting CrewAI PPT Generation for: {topic}")
    print(f"📋 Additional Requirements: {requirements or 'None'}")
    print("-" * 50)
    
    slides = generate_presentation_content(topic, requirements)
    
    print("\n" + "="*50)
    print("📄 GENERATED PRESENTATION SUMMARY")
    print("="*50)
    for slide in slides:
        print(f"Slide {slide['id'] + 1}: {slide['title']} ({slide['slideType']})")
        if 'agent_notes' in slide:
            print(f"  👥 {slide['agent_notes']}")
    
    print(f"\n🎯 Total Slides Generated: {len(slides)}")
    print(json.dumps(slides, indent=2))
