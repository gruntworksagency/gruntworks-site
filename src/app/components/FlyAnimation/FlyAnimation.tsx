import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useAnimation, AnimationControls } from 'framer-motion';

interface FlyAnimationProps {
  targetRefs: { [key: string]: React.RefObject<HTMLElement> }; // Now includes 'pill'
  containerRef: React.RefObject<HTMLElement>;
  flyWidth?: number;
  flyHeight?: number;
  flightDuration?: number; // seconds
  pauseDuration?: number; // milliseconds
  targetOffsets?: { [key: string]: { x?: number; y?: number } };
  flipDuration?: number; // milliseconds
  pathRandomnessFactor?: number; // 0 to 1
  pathKeyframeSamples?: number; // Number of intermediate points for the curve
}

const FLY_WIDTH_DEFAULT = 40;
const FLY_HEIGHT_DEFAULT = 40;
const FLIGHT_DURATION_DEFAULT = 2.5; // seconds
const PAUSE_DURATION_DEFAULT = 2000; // milliseconds
const FLIP_DURATION_DEFAULT = 150; // milliseconds
const PATH_RANDOMNESS_FACTOR_DEFAULT = 0.4;
const PATH_KEYFRAME_SAMPLES_DEFAULT = 5;

type TargetKey = 'ipad' | 'cta' | 'pill';

// Define the desired flight sequence
const sequence: TargetKey[] = ['pill', 'cta', 'ipad', 'cta'];

// Helper to get target's center coordinates relative to the container
const getAbsolutePosition = (
  targetKey: string,
  targetRefs: { [key: string]: React.RefObject<HTMLElement> },
  targetOffsets: { [key: string]: { x?: number; y?: number } } | undefined,
  containerElement: HTMLElement | null
): { x: number; y: number } | null => {
  if (!containerElement || !targetRefs[targetKey]?.current) {
    console.error(`FlyAnimation: Target element not found for key: ${targetKey}`);
    return null;
  }
  const containerRect = containerElement.getBoundingClientRect();
  const targetElement = targetRefs[targetKey].current;
  if (!targetElement) {
    return null;
  }
  const targetRect = targetElement.getBoundingClientRect();
  const offset = targetOffsets?.[targetKey] || { x: 0, y: 0 };

  const x = targetRect.left - containerRect.left + targetRect.width / 2 + (offset.x || 0);
  const y = targetRect.top - containerRect.top + targetRect.height / 2 + (offset.y || 0);

  return { x, y };
};

// Helper to generate Bezier curve keyframes
const generateCurvedPathKeyframes = (
  startPos: { x: number; y: number },
  endPos: { x: number; y: number },
  flyWidth: number,
  flyHeight: number,
  randomnessFactor: number,
  numSamples: number
): { xKeyframes: number[]; yKeyframes: number[]; times: number[] } => {
  const xKeyframes: number[] = [];
  const yKeyframes: number[] = [];
  const times: number[] = [];

  const P0 = startPos;
  const P3 = endPos;

  const delta = { x: P3.x - P0.x, y: P3.y - P0.y };
  const deltaMagnitude = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
  const perp = { x: -delta.y / deltaMagnitude, y: delta.x / deltaMagnitude }; // Normalized perpendicular

  // Control points with randomness
  const cp1OffsetFactor = 0.1 + Math.random() * 0.2;
  const cp2OffsetFactor = 0.1 + Math.random() * 0.2;

  const P1 = {
    x: P0.x + delta.x * cp1OffsetFactor + perp.x * (Math.random() - 0.5) * deltaMagnitude * randomnessFactor,
    y: P0.y + delta.y * cp1OffsetFactor + perp.y * (Math.random() - 0.5) * deltaMagnitude * randomnessFactor,
  };
  const P2 = {
    x: P3.x - delta.x * cp2OffsetFactor + perp.x * (Math.random() - 0.5) * deltaMagnitude * randomnessFactor,
    y: P3.y - delta.y * cp2OffsetFactor + perp.y * (Math.random() - 0.5) * deltaMagnitude * randomnessFactor,
  };

  for (let i = 0; i <= numSamples; i++) {
    const t = i / numSamples;
    const mt = 1 - t;
    // Cubic Bezier formula: B(t) = (1-t)³P0 + 3(1-t)²tP1 + 3(1-t)t²P2 + t³P3
    const x = mt * mt * mt * P0.x + 3 * mt * mt * t * P1.x + 3 * mt * t * t * P2.x + t * t * t * P3.x;
    const y = mt * mt * mt * P0.y + 3 * mt * mt * t * P1.y + 3 * mt * t * t * P2.y + t * t * t * P3.y;

    xKeyframes.push(x - flyWidth / 2); // Adjust for top-left positioning in framer-motion
    yKeyframes.push(y - flyHeight / 2);
    times.push(t);
  }

  return { xKeyframes, yKeyframes, times };
};

const FlyAnimation: React.FC<FlyAnimationProps> = ({
  targetRefs,
  containerRef,
  flyWidth = FLY_WIDTH_DEFAULT,
  flyHeight = FLY_HEIGHT_DEFAULT,
  flightDuration = FLIGHT_DURATION_DEFAULT,
  pauseDuration = PAUSE_DURATION_DEFAULT,
  targetOffsets = {},
  flipDuration = FLIP_DURATION_DEFAULT,
  pathRandomnessFactor = PATH_RANDOMNESS_FACTOR_DEFAULT,
  pathKeyframeSamples = PATH_KEYFRAME_SAMPLES_DEFAULT,
}) => {
  const flyControls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentFlyTopLeft, setCurrentFlyTopLeft] = useState<{ x: number; y: number } | null>(null);

  // State for animation logic
  const [isFlipped, setIsFlipped] = useState(true);
  const [isInitialFlight, setIsInitialFlight] = useState(true);
  // Index into sequence for current target
  const [sequenceIndex, setSequenceIndex] = useState<number>(0);

  const hasRunInitialSetup = useRef(false);

  // Initial setup for position and visibility
  useEffect(() => {
    if (hasRunInitialSetup.current || !containerRef.current) return;
    // Start at the first sequence entry (pill)
    const startKey = sequence[0];
    const startPos = getAbsolutePosition(startKey, targetRefs, targetOffsets, containerRef.current);

    if (startPos) {
      const initialTopLeft = { x: startPos.x - flyWidth / 2, y: startPos.y - flyHeight / 2 };
      flyControls.set({
        ...initialTopLeft,
        scaleX: -1, // Initial flip state
      });
      setCurrentFlyTopLeft(initialTopLeft);
      setIsVisible(true);
      // Initialize sequence index
      setSequenceIndex(0);
      hasRunInitialSetup.current = true;
    } else {
      setIsVisible(false);
    }
  }, [containerRef, targetRefs, targetOffsets, flyWidth, flyHeight, flyControls]);

  // Main animation sequence
  useEffect(() => {
    if (!isVisible || !containerRef.current || !hasRunInitialSetup.current) return;

    const getAnimationPathEndpoints = (
      currentFlyTopLeft: { x: number; y: number } | null,
      sourceKey: TargetKey,
      destinationKey: TargetKey
    ): { pathStartPos: { x: number; y: number }; pathEndPos: { x: number; y: number } } | null => {
      let pathStartPos: { x: number; y: number } | null = null;
      if (currentFlyTopLeft) {
        pathStartPos = {
          x: currentFlyTopLeft.x + flyWidth / 2,
          y: currentFlyTopLeft.y + flyHeight / 2,
        };
      } else {
        const containerElement = containerRef.current;
        if (containerElement) {
          pathStartPos = getAbsolutePosition(sourceKey, targetRefs, targetOffsets, containerElement);
        }
      }

      const containerElement = containerRef.current;
      const pathEndPos = containerElement ? getAbsolutePosition(destinationKey, targetRefs, targetOffsets, containerElement) : null;

      if (!pathStartPos || !pathEndPos) {
        return null;
      }
      return { pathStartPos, pathEndPos };
    };

    const performPreFlightFlip = async (
      flyControls: AnimationControls,
      currentIsInitialFlight: boolean,
      currentIsFlipped: boolean
    ): Promise<boolean> => {
      const nextFlipState = currentIsInitialFlight ? false : !currentIsFlipped;
      await flyControls.start({
        scaleX: nextFlipState ? 1 : -1,
        transition: { duration: flipDuration / 1000, ease: "easeInOut" },
      });
      setIsFlipped(nextFlipState);
      if (currentIsInitialFlight) {
        setIsInitialFlight(false);
      }
      return nextFlipState;
    };

    const executeFlight = async (
      flyControls: AnimationControls,
      pathStartPos: { x: number; y: number },
      pathEndPos: { x: number; y: number }
    ): Promise<{ x: number; y: number } | null> => {
      const { xKeyframes, yKeyframes, times } = generateCurvedPathKeyframes(
        pathStartPos,
        pathEndPos,
        flyWidth,
        flyHeight,
        pathRandomnessFactor,
        pathKeyframeSamples
      );

      await flyControls.start({
        x: xKeyframes,
        y: yKeyframes,
        transition: {
          duration: flightDuration,
          ease: "linear",
          times: times,
        },
      });
      
      if (xKeyframes.length > 0 && yKeyframes.length > 0) {
        return { x: xKeyframes[xKeyframes.length - 1], y: yKeyframes[yKeyframes.length - 1] };
      }
      return null;
    };

    const handleMissingPathEndpoints = async (
      destinationKey: TargetKey,
      nextIdx: number,
      currentFlyPos: typeof currentFlyTopLeft
    ): Promise<void> => {
      const containerElement = containerRef.current;
      if (currentFlyPos && !getAbsolutePosition(destinationKey, targetRefs, targetOffsets, containerElement || null) && containerElement) {
        // If start is known but end is not, just pause and try next
        await new Promise(resolve => setTimeout(resolve, pauseDuration));
      } else if (!currentFlyPos && containerElement) {
        const endPos = getAbsolutePosition(destinationKey, targetRefs, targetOffsets, containerElement);
        if (endPos) { // Fly was not visible, but a target is. Snap to it.
          const newTopLeft = { x: endPos.x - flyWidth / 2, y: endPos.y - flyHeight / 2 };
          flyControls.set(newTopLeft);
          setCurrentFlyTopLeft(newTopLeft);
        } else {
          console.error("[FlyAnimation] Critical error: Cannot determine path when fly not visible. Skipping this leg.");
        }
      } else {
        console.error("[FlyAnimation] Critical error: Cannot determine path (both start/end unknown or container missing). Skipping this leg.");
      }
      setSequenceIndex(nextIdx);
    };

    const handleFailedFlightExecution = (destinationKey: TargetKey): void => {
      console.error("[FlyAnimation] Flight execution did not return a valid end position.");
      const expectedEndPosAbsolute = getAbsolutePosition(destinationKey, targetRefs, targetOffsets, containerRef.current);
      if (expectedEndPosAbsolute) {
        const fallbackTopLeft = { x: expectedEndPosAbsolute.x - flyWidth / 2, y: expectedEndPosAbsolute.y - flyHeight / 2 };
        flyControls.set(fallbackTopLeft);
        setCurrentFlyTopLeft(fallbackTopLeft);
      }
    };

    const animateFlightSequence = async () => {
      const sourceKey = sequence[sequenceIndex];
      const nextIndex = (sequenceIndex + 1) % sequence.length;
      const destinationKey = sequence[nextIndex];

      const pathEndpoints = getAnimationPathEndpoints(currentFlyTopLeft, sourceKey, destinationKey);

      if (!pathEndpoints) {
        await handleMissingPathEndpoints(destinationKey, nextIndex, currentFlyTopLeft);
        return;
      }

      const { pathStartPos, pathEndPos } = pathEndpoints;

      await new Promise(resolve => setTimeout(resolve, pauseDuration));

      await performPreFlightFlip(flyControls, isInitialFlight, isFlipped);
      
      const newTopLeft = await executeFlight(flyControls, pathStartPos, pathEndPos);

      if (newTopLeft) {
        setCurrentFlyTopLeft(newTopLeft);
      } else {
        handleFailedFlightExecution(destinationKey);
      }
      
      setSequenceIndex(nextIndex);
    };

    animateFlightSequence().catch(console.error);

    // Cleanup function to stop animation if component unmounts mid-animation
    return () => {
      flyControls.stop();
    };

  }, [
    isVisible,
    sequenceIndex,
    flyControls,
    containerRef,
    targetRefs,
    targetOffsets,
    flyWidth,
    flyHeight,
    flightDuration,
    pauseDuration,
    flipDuration,
    pathRandomnessFactor,
    pathKeyframeSamples,
    currentFlyTopLeft,
    isFlipped,
    isInitialFlight,
  ]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      animate={flyControls}
      style={{
        position: 'absolute',
        zIndex: 30, // As per original
        // Removed width and height from parent div, letting Image handle size
        // width: flyWidth,
        // height: flyHeight,
        // transformOrigin: 'center center', // Good for rotations, not strictly needed now
      }}
      aria-hidden="true"
    >
      <Image src="/fly.png" alt="animated fly" width={flyWidth} height={flyHeight} priority style={{ width: 'auto', height: 'auto' }} />
    </motion.div>
  );
};

export default FlyAnimation;