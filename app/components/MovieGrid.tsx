"use client";
import {
  AddRounded,
  ArrowBack,
  ArrowForward,
  PlayArrow,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import movies from "../../data/movies.json";

export default function MovieGrid() {
  const [recommendedScrollX, setRecommendedScrollX] = useState(0);
  const [trendingScrollX, setTrendingScrollX] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const recommendedListRef = useRef<HTMLDivElement | null>(null);
  const trendingListRef = useRef<HTMLDivElement | null>(null);

  const handleRecommendedScroll = (scrollOffset: number) => {
    if (recommendedListRef.current) {
      const newScrollX = recommendedScrollX + scrollOffset;
      recommendedListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setRecommendedScrollX(newScrollX);
    }
  };

  const handleTrendingScroll = (scrollOffset: number) => {
    if (trendingListRef.current) {
      const newScrollX = trendingScrollX + scrollOffset;
      trendingListRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
      });
      setTrendingScrollX(newScrollX);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <Box sx={{ backgroundColor: "#000000", p: 2 }}>
      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        Trending movies
      </Typography>
      <Box
        ref={trendingListRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {movies.map((movie, index) => (
          <Card
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            sx={{ minWidth: 200, position: "relative" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                src={movie.thumbnail}
                alt={movie.title}
                loading="lazy"
                sx={{ height: 300, objectFit: "cover" }}
              />
              {hovered === index && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px",
                    background:
                      "linear-gradient(transparent, rgba(0, 0, 0, 0.7))",
                    transition: "opacity 0.3s",
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => {
                      // Handle play button click
                    }}
                  >
                    <PlayArrow sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      // Handle AddIcon click
                    }}
                  >
                    <AddRounded sx={{ color: "white", padding: "10px" }} />
                  </IconButton>
                </Box>
              )}
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <IconButton
          color="primary"
          disabled={trendingScrollX === 0}
          onClick={() => handleTrendingScroll(-200)}
        >
          <ArrowBack />
        </IconButton>
        <IconButton color="primary" onClick={() => handleTrendingScroll(200)}>
          <ArrowForward />
        </IconButton>
      </Box>

      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        Recommended movies
      </Typography>
      <Box
        ref={recommendedListRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {movies.map((movie, index) => (
          <Card key={index} sx={{ minWidth: 200 }}>
            <CardMedia
              component="img"
              src={movie.thumbnail}
              alt={movie.title}
              loading="lazy"
              sx={{ height: 300, objectFit: "cover" }}
            />
          </Card>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <IconButton
          color="primary"
          disabled={recommendedScrollX === 0}
          onClick={() => handleRecommendedScroll(-200)}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          color="primary"
          onClick={() => handleRecommendedScroll(200)}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        All movies
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {movies.map((movie, index) => (
          <Card key={index} sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              src={movie.thumbnail}
              alt={movie.title}
              loading="lazy"
              sx={{ height: 300, objectFit: "cover" }}
            />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
