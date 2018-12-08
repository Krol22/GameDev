# Instalation: 

## Todo:

Target: creating set of systems that will help me creating my own game. Designing architecture and communication of different parts of game.

- ECS
- GraphicManager (canvas)
- AnimationsManager
- SoundManagement
- UIManager
- AssetsLoader
- InputManager
- StateManager
- LoadSaveStateManager

StateManagement 

    ◻️ - basic state,
    ◻️ - state management system,
    ◻️ - transition between states,

Bugs 🐛

    ◻️ - component types for system should be defined in system class not when creating one,
    ◻️ - Sprite add total number of frames,

UIManager 

    ◻️ - creating and applying styles for gameUI component,
    ◻️ - create basic input component,
    ◻️ - (Input) events buttonslike logic (events: hover, focus, blur, out, changed), 
    ◻️ - documentation,


InputManager

    ◻️ - button1 and 2 - down, pressed (I need an actual mouse to test it :/ )
        
Animation Manager,

    ◻️ - unit tests

Debugging tools,

    ◻️ - Debug drawing tools,
    
SoundManager

ECS

    ◻️ - importing and exporting state from ECS,

## Done:

### ECS
    ✅ - Entities,
    ✅ - System management,
    ✅ - Component types,
    ✅ - rewrite to TS,
    ✅ - setup proj and vim,
    ✅ - {!} Created systems should take eventAggregator as an import,

### GraphicManager
    ✅ - Draw basic shapes for debugging, or basics particle effects, 
    ✅ - Draw text,
    ✅ - Draw texture,
    ✅ - Draw texture fragment (sprite),
    ✅ - Test site with canvas 

### Animations Manager
    ✅ - Static animations poc,
    ✅ - Static animations,
    ✅ - Skeleton,
    ✅ - Skeletal animations poc,
    ✅ - Skeletal animations,
        ✅ - Multiple childJoins from one join,
        ✅ - Multiple animation at once (in one skeleton),
        ❌ - Easing functions, 
    ✅ - multiple animations states (run - on right arrow, hit - on space),
    ✅ - Connect skeletal animations with static animations (add texture),
    ✅ - Skelet with bones with actual animated textures,
    ✅ - Cleaning code for nice components 
    ✅ - Prepare code for ECS pattern (separate texture animations from skeletal animations),
    ✅ - Prepare demo - 
        ✅ Player (bone texture animations) - With armor changes
        ✅ static box,
        ✅ tree (static looped animation), 
        ✅ just bone animation,
    ✅ - Documentation and DONE!
    
### UIManager
    ✅ - add shadow root for gameUI component
    ✅ - Button
        ✅ - create button for game,
        ✅ - add additional event on button - hover, pressed, released,
        ✅ - add additional property that will filter what events should send button (not all button will send hover events);

    InputManager,
        ✅ - handle for keyboard events - isDown, isPressed
        ✅ - Mouse 
            ✅ - cursor position, 

    AssetsManagement,
        ✅ - create asset manager for Object Assets management,
        ✅ - create asset loader,
            ✅ - progress in % (or to load - loaded values)

## ToDo_v2:

Fixes for bugs and creating game (swarm or road fighter)

### Animation manager 
    ◻️ - angle animation:
        ◻️ - increase animation not from - to,
        ◻️ - change step (not fluid but change angle f.e by 2 degrees)

### ECS
    ◻️ - Pasue/resume functions,
    ◻️ - Get entity reference by entityId,
    ◻️ - Way of creating component that has to be an interface,

### Bugs 🐛
    ◻️ - Join points werid position

