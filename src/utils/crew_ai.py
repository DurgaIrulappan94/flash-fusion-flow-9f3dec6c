
import json
import sys
from typing import List, Dict, Any

def generate_presentation_content(topic: str, requirements: str = "", num_slides: int = 8) -> List[Dict[str, Any]]:
    """
    Generate professional presentation content using CrewAI-style approach
    """
    
    # Base slide structure
    slides = []
    
    # Title slide
    slides.append({
        "id": 0,
        "title": topic,
        "subtitle": "Professional Presentation",
        "content": [
            "Executive Overview",
            "Strategic Objectives", 
            "Key Performance Indicators",
            "Implementation Roadmap"
        ],
        "slideType": "title",
        "layout": "title",
        "images": []
    })
    
    # Executive Summary
    slides.append({
        "id": 1,
        "title": "Executive Summary",
        "content": [
            f"Comprehensive analysis of {topic}",
            "Strategic recommendations based on industry best practices",
            "Data-driven insights and market research",
            "Risk assessment and mitigation strategies",
            "Expected ROI and business impact"
        ],
        "slideType": "content",
        "layout": "content",
        "images": []
    })
    
    # Market Analysis
    slides.append({
        "id": 2,
        "title": "Market Analysis & Opportunities",
        "content": [
            "Current market landscape and trends",
            "Competitive positioning analysis", 
            "Target audience segmentation",
            "Growth opportunities identification",
            "Market penetration strategies"
        ],
        "slideType": "content",
        "layout": "content_with_image",
        "images": []
    })
    
    # Strategic Framework
    slides.append({
        "id": 3,
        "title": "Strategic Framework",
        "content": [
            "Vision and mission alignment",
            "Core value propositions",
            "Strategic pillars and initiatives",
            "Success metrics and KPIs",
            "Timeline and milestones"
        ],
        "slideType": "content",
        "layout": "content",
        "images": []
    })
    
    # Implementation Plan
    slides.append({
        "id": 4,
        "title": "Implementation Plan",
        "content": [
            "Phase 1: Foundation and Setup (Months 1-3)",
            "Phase 2: Development and Testing (Months 4-6)",
            "Phase 3: Launch and Optimization (Months 7-9)",
            "Phase 4: Scaling and Growth (Months 10-12)",
            "Resource allocation and budget requirements"
        ],
        "slideType": "content",
        "layout": "content",
        "images": []
    })
    
    # Custom requirements slide if provided
    if requirements.strip():
        slides.append({
            "id": 5,
            "title": "Custom Requirements Analysis",
            "content": [
                f"Specific focus on: {requirements}",
                "Detailed requirement breakdown",
                "Technical specifications and constraints",
                "Quality assurance measures",
                "Compliance and regulatory considerations"
            ],
            "slideType": "content",
            "layout": "content_with_image",
            "images": []
        })
    
    # Risk Management
    slides.append({
        "id": len(slides),
        "title": "Risk Management",
        "content": [
            "Identified potential risks and challenges",
            "Risk probability and impact assessment",
            "Mitigation strategies and contingency plans",
            "Monitoring and review processes",
            "Escalation procedures and decision frameworks"
        ],
        "slideType": "content",
        "layout": "content",
        "images": []
    })
    
    # Financial Projections
    slides.append({
        "id": len(slides),
        "title": "Financial Projections",
        "content": [
            "Investment requirements and funding sources",
            "Revenue projections and growth assumptions",
            "Cost structure and operational expenses",
            "Break-even analysis and profitability timeline",
            "Return on investment calculations"
        ],
        "slideType": "content",
        "layout": "content_with_image",
        "images": []
    })
    
    # Closing slide
    slides.append({
        "id": len(slides),
        "title": "Thank You",
        "subtitle": "Questions & Discussion",
        "content": [
            "Contact Information",
            "Additional Resources",
            "Appendix Available",
            "Follow-up Actions"
        ],
        "slideType": "closing",
        "layout": "title",
        "images": []
    })
    
    return slides

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python crew_ai.py <topic> [requirements]")
        sys.exit(1)
    
    topic = sys.argv[1]
    requirements = sys.argv[2] if len(sys.argv) > 2 else ""
    
    slides = generate_presentation_content(topic, requirements)
    print(json.dumps(slides, indent=2))
