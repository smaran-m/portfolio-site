---
title: "kyuna"
date: "2025-08-10"
description: "kyuna.ai is a quiz website that leverages LLMs to rate and handle free-response questions"
tags: ["project", "kyuna"]
---

# kyuna.ai
[kyuna.ai](https://www.kyuna.ai/) is an LLM-powered quiz application built on Python (FastAPI), Next.js and Firebase. Questions can be multiple choice, free response, or ratings, and you get put into a category at the end accordingly. While it is live, it isn't feature complete, and I'm using it as a fullstack/ml eng testbed.

## Features
- Generate and serve quizzes described as human-editable YAML files
- Client app in Next.js renders quizzes, collects answers, and displays results with a modern React UI and components for quiz flow, results, and creation.
- Unique and dynamically generated shareable quiz urls
- Firebase integration for user/session persistence and optional auth flows.
- Simple CLI to load YAML quizzes into the API so content can be seeded or updated easily.
- Automated tests for both backend (pytest) and frontend (Jest + Playwright E2E) to ensure core flows and security checks remain intact.

## Architecture
- Backend: Python + FastAPI. Serves JSON quiz endpoints and provides an OpenAPI surface for quick inspection. A loader CLI ingests YAML quiz files and posts them to the API.
- Frontend: Next.js (React) app that fetches quizzes and renders them. UI split into reusable components (quiz view, results view, create quiz view).
- Data/Auth: Firebase for session data and optional user management.
- Deployment: Backend runs on Render. Frontend hosted on Vercel (preview and prod envs).

## Planned additions
- Image thumbnails for quizzes
- Auto-generated shareable cards for quizzes and results
- Quiz generation updates and nightly workers