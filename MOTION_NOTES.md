# Motion Notes

The SmartButton uses intentional motion to make each state change clear without making the interaction feel slow or distracting.

State-related transitions use a **280ms duration** with the easing function **`cubic-bezier(.22, .8, .2, 1)`**. This timing provides a quick response while still making transitions feel smooth rather than abrupt. The easing gives the button a responsive start and a softer finish.

The implementation primarily animates compositor-friendly properties such as **transform and opacity**, which helps avoid unnecessary layout work during interaction. Hover and active states also use small transform changes to provide immediate visual feedback.

The button lifecycle is designed around clear states: **idle → loading → success/error → idle**. Loading disables repeated submissions so rapid clicking cannot create conflicting operations. Success automatically returns to the idle state, while the error state exposes a retry action.

The demo includes dedicated **Force Success** and **Force Error** controls so a reviewer can reproduce both outcomes on demand instead of relying on random failures.

The project also respects **`prefers-reduced-motion`**. When reduced motion is requested, non-essential animations and transitions are effectively removed while the underlying state changes and feedback remain visible. This preserves usability without sacrificing communication.

Overall, the motion language is intentionally simple: short durations, predictable easing, transform/opacity-based transitions, and clear visual state feedback.
