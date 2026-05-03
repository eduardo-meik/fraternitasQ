# **App Name**: Cuestionario Fraternitas

## Core Features:

- Multi-Step Questionnaire Navigation: Core user interface framework for smoothly navigating through 5 distinct questionnaire steps, managing the display of the current step and handling transitions between them.
- Dynamic Form State and Autosave System: Centralized state management for all form data collected across steps, incorporating automatic saving of user progress to local storage (key: 'tttc_draft_[questionnaireId]') and simulated asynchronous API calls to '/api/questionnaires/:id/autosave' at each successful step progression.
- Invitation Code Management: An optional input field for an invitation code (from an ambassador), including a simulated validation API call to '/api/questionnaires/:id/validate-invitation-code' before allowing the user to proceed.
- Qualitative Narrative Input & Validation: Three dedicated textarea fields for narrative responses, each enforcing a minimum character count (200 characters) with real-time character counters. Progression to the next step is disabled until all narrative fields meet the validation criteria.
- Conditional Psychographic Input: A dynamic form section for selecting community affiliations, where choosing specific categories (e.g., 'Instituciones Filosóficas', 'Religiosas') conditionally reveals an additional input field for a 'lodge or community name' with its own validation rules.
- Personalized Ambassador Code Generation: A generative AI tool that automatically creates a unique ambassador code upon questionnaire finalization. This tool ensures the code's uniqueness and relevance to facilitate a robust referral system.
- Final Submission & Success Confirmation: Manages the final 'Finalizar y Enviar' action, including a simulated asynchronous API call to '/api/questionnaires/:id/finalize', displays loading states, and then presents the user with their unique, AI-generated ambassador code and generic sharing options.

## Style Guidelines:

- Color scheme: Light mode. Primary actions and brand emphasis will use a composed mid-tone blue (#4A6D9B). This choice embodies trustworthiness and depth, aligning with thoughtful qualitative research. This color maintains a good contrast on lighter backgrounds.
- Backgrounds will feature a very light, almost white, cool blue-grey (#F3F6F9). This choice provides a serene and clean canvas that promotes readability and focuses attention on the content without causing visual fatigue, being visibly of the same hue as the primary but heavily desaturated.
- An energetic, brighter cyan (#3BD1EB) will serve as the accent color. This analogous hue (from the primary blue) is significantly more saturated and brighter, perfect for calls-to-action, highlights, and interactive elements, providing clear visual differentiation and vibrancy.
- Headlines will utilize 'Inter', a modern sans-serif typeface, to provide clarity and a clean, objective tone. For body text, 'Alegreya', a humanist serif, will be used to enhance readability and lend an elegant, intellectual feel, particularly beneficial for the extensive narrative responses.
- Implement a set of clean, line-based vector icons. Icons should be easily understandable, subtly reinforce UI elements without distracting, and maintain accessibility standards, particularly for navigation and interactive elements.
- A mobile-first, responsive layout will be applied, utilizing a card-based structure for each questionnaire step to ensure clarity and organization. Generous use of whitespace will enhance content readability and provide a focused user experience across all device sizes.
- Subtle and purposeful animations will be employed for step transitions, form feedback (e.g., valid/invalid states), and loading indicators. Animations will be minimal, fluid, and quick to ensure a responsive and intuitive user experience without causing delays.