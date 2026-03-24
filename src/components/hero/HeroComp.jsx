import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const HeroComp = () => {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // DOM queries are now safe — component is mounted
    const animatedIcons = document.querySelector(".d-animated-icons");
    const iconElements = document.querySelectorAll(".animated-icon");
    const textSegments = document.querySelectorAll(".d-text-segment");
    const placeholder = document.querySelectorAll(".d-placeholder-icon");
    const heroHeader = document.querySelector(".d-hero-header");
    const heroSection = document.querySelector(".d-hero");

    const textAnimationOrder = [];
    textSegments.forEach((segment, idx) => {
      textAnimationOrder.push({ segment, originalIndex: idx });
    });

    for (let i = textAnimationOrder.length; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [textAnimationOrder[i], textAnimationOrder[j]] = [
        textAnimationOrder[j],
        textAnimationOrder[i],
      ];
    }

    const isMobile = window.innerWidth <= 1000;
    const headerIconSize = isMobile ? 30 : 60;
    const currentIconSize = iconElements[0].getBoundingClientRect().width; // safe now
    const exactScale = headerIconSize / currentIconSize;

    const trigger = ScrollTrigger.create({
      trigger: ".d-hero",
      start: "top top",
      end: `+=${window.innerHeight * 8}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        textSegments.forEach((segment) => {
          gsap.set(segment, { opacity: 0 });
        });

        if (progress <= 0.3) {
          const moveProgress = progress / 0.3;
          const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

          if (progress <= 0.15) {
            const headerProgress = progress / 0.15;
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            gsap.set(heroHeader, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) duplicate.parentNode.removeChild(duplicate);
            });
            window.duplicateIcons = null;
          }

          gsap.set(animatedIcons, { x: 0, y: containerMoveY, scale: 1, opacity: 1 });

          iconElements.forEach((icon, index) => {
            const staggerDelay = index * 0.1;
            const iconProgress = gsap.utils.mapRange(
              staggerDelay, staggerDelay + 0.5, 0, 1, moveProgress
            );
            const clampedProgress = Math.max(0, Math.min(1, iconProgress));
            const individualY = -containerMoveY * (1 - clampedProgress);
            gsap.set(icon, { x: 0, y: individualY });
          });

        } else if (progress <= 0.6) {
          const scaleProgress = (progress - 0.3) / 0.3;

          gsap.set(heroHeader, { transform: `translate(-50%, calc(-50% + -50px))`, opacity: 0 });
          heroSection.style.backgroundColor = scaleProgress >= 0.5 ? "#e3e3db" : "#141414";

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate) => {
              if (duplicate.parentNode) duplicate.parentNode.removeChild(duplicate);
            });
            window.duplicateIcons = null;
          }

          const targetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerWidth / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const deltaX = (targetCenterX - (containerRect.left + containerRect.width / 2)) * scaleProgress;
          const deltaY = (targetCenterY - (containerRect.top + containerRect.height / 2)) * scaleProgress;
          const baseY = -window.innerHeight * 0.3;

          gsap.set(animatedIcons, {
            x: deltaX,
            y: baseY + deltaY,
            scale: 1 + (exactScale - 1) * scaleProgress,
            opacity: 1,
          });

          iconElements.forEach((icon) => gsap.set(icon, { x: 0, y: 0 }));

        } else if (progress <= 0.75) {
          const moveProgress = (progress - 0.6) / 0.15;

          gsap.set(heroHeader, { transform: `translate(-50%, calc(-50% + -50px))`, opacity: 0 });
          heroSection.style.backgroundColor = "#e3e3db";

          const targetCenterY = window.innerHeight / 2;
          const targetCenterX = window.innerWidth / 2;
          const containerRect = animatedIcons.getBoundingClientRect();
          const deltaX = targetCenterX - (containerRect.left + containerRect.width / 2);
          const deltaY = targetCenterY - (containerRect.top + containerRect.height / 2);
          const baseY = -window.innerHeight * 0.3;

          gsap.set(animatedIcons, { x: deltaX, y: baseY + deltaY, scale: exactScale, opacity: 0 });
          iconElements.forEach((icon) => gsap.set(icon, { x: 0, y: 0 }));

          if (!window.duplicateIcons) {
            window.duplicateIcons = [];
            iconElements.forEach((icon) => {
              const duplicate = icon.cloneNode(true);
              duplicate.className = "duplicate-icon";
              duplicate.style.position = "absolute";
              duplicate.style.width = headerIconSize + "px";
              duplicate.style.height = headerIconSize + "px";
              document.body.appendChild(duplicate);
              window.duplicateIcons.push(duplicate);
            });
          }

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, idx) => {
              if (idx < placeholder.length) {
                const iconRect = iconElements[idx].getBoundingClientRect();
                const startPageX = iconRect.left + iconRect.width / 2 + window.pageXOffset;
                const startPageY = iconRect.top + iconRect.height / 2 + window.pageYOffset;

                const targetRect = placeholder[idx].getBoundingClientRect();
                const targetPageX = targetRect.left + targetRect.width / 2 + window.pageXOffset;
                const targetPageY = targetRect.top + targetRect.height / 2 + window.pageYOffset;

                const moveX = targetPageX - startPageX;
                const moveY = targetPageY - startPageY;
                let currentX = 0;
                let currentY = 0;

                if (moveProgress <= 0.5) {
                  currentY = moveY * (moveProgress / 0.5);
                } else {
                  currentY = moveY;
                  currentX = moveX * ((moveProgress - 0.5) / 0.5);
                }

                duplicate.style.left = (startPageX + currentX - headerIconSize / 2) + "px";
                duplicate.style.top = (startPageY + currentY - headerIconSize / 2) + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }

        } else {
          gsap.set(heroHeader, { transform: `translate(-50%, calc(-50% + -100px))`, opacity: 0 });
          heroSection.style.backgroundColor = "#e3e3db";
          gsap.set(animatedIcons, { opacity: 0 });

          if (window.duplicateIcons) {
            window.duplicateIcons.forEach((duplicate, idx) => {
              if (idx < placeholder.length) {
                const targetRect = placeholder[idx].getBoundingClientRect();
                const targetPageX = targetRect.left + targetRect.width / 2 + window.pageXOffset;
                const targetPageY = targetRect.top + targetRect.height / 2 + window.pageYOffset;
                duplicate.style.left = (targetPageX - headerIconSize / 2) + "px";
                duplicate.style.top = (targetPageY - headerIconSize / 2) + "px";
                duplicate.style.opacity = "1";
                duplicate.style.display = "flex";
              }
            });
          }

          textAnimationOrder.forEach((item, randomIdx) => {
            const segmentStart = 0.75 + randomIdx * 0.03;
            const segmentEnd = segmentStart + 0.015;
            const segmentProgress = gsap.utils.mapRange(segmentStart, segmentEnd, 0, 1, progress);
            const clampedProgress = Math.max(0, Math.min(1, segmentProgress));
            gsap.set(item.segment, { opacity: clampedProgress });
          });
        }
      },
    });

    // Cleanup on unmount
    return () => {
      trigger.kill();
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((d) => d.parentNode?.removeChild(d));
        window.duplicateIcons = null;
      }
    };
  }, []);

  return (
    <>
      <section id="d-section" className="d-hero">
        <div className="d-hero-header">
          <h1>CodeGridPRO</h1>
          <p>One Subscription, endless web design</p>
        </div>

        <div className="d-animated-icons">
          <div className="animated-icon icon-1"><img src="/hero/icon-1.png" alt="" /></div>
          <div className="animated-icon icon-2"><img src="/hero/icon-2.png" alt="" /></div>
          <div className="animated-icon icon-3"><img src="/hero/icon-3.png" alt="" /></div>
          <div className="animated-icon icon-4"><img src="/hero/icon-4.png" alt="" /></div>
          <div className="animated-icon icon-5"><img src="/hero/icon-5.png" alt="" /></div>
        </div>

        <h1 className="d-animated-text">
          <div className="d-placeholder-icon"></div>
          <span className="d-text-segment">Delve into codings</span>
          <div className="d-placeholder-icon"></div>
          <span className="d-text-segment">without clutter.</span>
          <span className="d-text-segment">Unlock source code</span>
          <div className="d-placeholder-icon"></div>
          <span className="d-text-segment">published on the Codegrid</span>
          <div className="d-placeholder-icon"></div>
          <span className="d-text-segment">Youtube Channel</span>
        </h1>
      </section>
      <section id="d-section" className="d-outro">
        <h1>Link in the description</h1>
      </section>
    </>
  );
};

export default HeroComp;