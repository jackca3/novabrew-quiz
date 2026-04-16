# NovaBrew Coffee Taste Profile Quiz — Requirements

## Overview
A web-based personality quiz that matches coffee subscribers to their coffee personality and recommends specific NovaBrew coffees based on their result.

## Personality Types

### Bold Explorer
For the person who wants intensity, depth, and a little drama in the cup. They like bold roasts, strong flavor, and coffees that feel confident.

### Smooth Operator
Balanced, reliable, and easy to love. This person appreciates smooth flavor, classic notes, and a cup that feels polished without being flashy.

### Cozy Classic
Comfort-first and warm. This personality leans toward familiar, cozy flavors and a cup that feels like a routine worth keeping.

### Wild Card
Curious, adventurous, and open to surprises. They like trying unusual coffees and want something that feels a little unexpected.

## Coffee Pairings

- Bold Explorer → Midnight Summit
  - Dark roast, smoky, bold
- Smooth Operator → Sunrise Blend
  - Medium roast, balanced, caramel and chocolate
- Cozy Classic → Sunday Paper
  - Medium roast, hazelnut, vanilla, comforting
- Wild Card → Off the Map
  - Experimental processing, funky fruit notes, rotating micro-lot

## Quiz Questions

### Question 1
You finally have a quiet Saturday morning. What are you reaching for?
- A) A strong, no-nonsense cup and a full to-do list. (Bold Explorer)
- B) A balanced cup and an easy breakfast. (Smooth Operator)
- C) Something cozy while you read or relax. (Cozy Classic)
- D) A new brew method or a coffee you have never tried before. (Wild Card)

### Question 2
Which travel plan sounds most appealing?
- A) A high-energy trip with packed days and big sights. (Bold Explorer)
- B) A well-planned city weekend with great food and coffee stops. (Smooth Operator)
- C) A cabin, a book, and a slow morning routine. (Cozy Classic)
- D) A spontaneous destination you picked at the last minute. (Wild Card)

### Question 3
When you order coffee, what matters most?
- A) It hits hard and tastes intense. (Bold Explorer)
- B) It is smooth and consistently good. (Smooth Operator)
- C) It feels familiar and comforting. (Cozy Classic)
- D) It surprises you in a good way. (Wild Card)

### Question 4
Pick the sentence that sounds most like you:
- A) “I like coffee with a strong personality.” (Bold Explorer)
- B) “I want something balanced that I can count on.” (Smooth Operator)
- C) “I just want my coffee to feel comforting.” (Cozy Classic)
- D) “I want to keep discovering new favorites.” (Wild Card)

### Question 5
Which kitchen shelf would you be most proud of?
- A) One with bold beans and espresso gear. (Bold Explorer)
- B) One with a clean setup and a reliable grinder. (Smooth Operator)
- C) One with mugs, syrups, and cozy essentials. (Cozy Classic)
- D) One with unusual beans, notes, and a few surprises. (Wild Card)

### Question 6
Your ideal coffee subscription should feel like:
- A) A bold ritual that wakes you up. (Bold Explorer)
- B) A dependable favorite that always works. (Smooth Operator)
- C) A comforting habit that makes mornings better. (Cozy Classic)
- D) A discovery engine that keeps things interesting. (Wild Card)

## Quiz Logic
- Each answer maps to one personality type
- Track a running tally across all questions
- At the end, the personality with the highest count is the primary result
- Show the second-highest result as the secondary personality
- If there is a tie, prefer the personality tied to the final question or ask a tiebreaker if needed

## Visual Style
Playful with a premium finish.

- Warm cream, peach, and terracotta tones
- Rounded cards and friendly buttons
- Clean layout so it feels modern, not childish
- Light motion and gentle transitions
- A little personality in the copy and result titles
- Overall vibe: friendly, social, and shareable, with enough polish to feel like a real NovaBrew brand experience

## Extra Features
- Images: no for the first version
- Icons/emoji: yes, lightly used for answer options and personality headings
- Shareability: yes, results page should feel easy to screenshot and share

## Technical Notes
- Built with Next.js + Tailwind CSS
- Single-page app with smooth transitions between questions
- Mobile-responsive
- Results page is shareable
- Keep the first version simple and fast to ship
