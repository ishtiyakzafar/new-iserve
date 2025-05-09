# Step 1: Use official Node.js Alpine image
FROM node:18-alpine AS builder

# Step 2: Set working directory
WORKDIR /app

# Step 3: Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Step 4: Copy the rest of your app
COPY . .

# Step 5: Remove any old builds (important!)
RUN rm -rf .next

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Use a lighter production image
FROM node:18-alpine AS runner

WORKDIR /app

# Step 8: Only copy necessary files for runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Step 9: Expose port
EXPOSE 3000

# Step 10: Start the production server
CMD ["npm", "run", "start"]