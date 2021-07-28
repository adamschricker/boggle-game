"use strict";

(() => {
  /**********/
  /** Dice **/
  /**********/
  const dice = {

    /**************************************/
    /** Dice - Dice                      **/
    /** Based on dice from a Boggle game **/
    /**************************************/
    dice : [
      ["Qu", "A", "M", "O", "B", "J"],
      ["F", "I", "R", "O", "B", "X"],
      ["P", "D", "C", "M", "E", "A"],
      ["D", "E", "N", "O", "D", "N"],
      ["Y", "L", "G", "U", "K", "L"],
      ["G", "T", "N", "V", "I", "E"],
      ["U", "L", "E", "P", "T", "S"],
      ["A", "L", "E", "R", "C", "S"],
      ["F", "I", "H", "E", "E", "Y"],
      ["O", "R", "A", "M", "S", "H"],
      ["O", "C", "A", "T", "A", "I"],
      ["O", "T", "U", "K", "N", "D"],
      ["P", "H", "N", "S", "E", "I"],
      ["N", "V", "D", "Z", "A", "E"],
      ["T", "L", "Y", "B", "A", "I"],
      ["G", "W", "R", "L", "I", "U"],
    ],

    /****************************/
    /** Dice - Random Die Side **/
    /****************************/
    randomDieSide: function(die) {
      return die[Math.floor(Math.random() * die.length)];
    },

    /********************/
    /** Dice - Shuffle **/
    /********************/
    shuffle: function() {
      for (let i = this.dice.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [this.dice[i], this.dice[j]] = [this.dice[j], this.dice[i]];
      }
    },
  };


  /*************/
  /** Display **/
  /*************/
  const display = {


    /************************/
    /** Display - Elements **/
    /************************/
    elements: {

      /********************************/
      /** Display - Elements - Board **/
      /********************************/
      board: {
        build: function() {
          this.built = true;
          game.display.functions.clearElement(this.element);
          game.dice.shuffle();
          game.dice.dice.forEach((_, index) => {
            const die = document.createElement("div");
            die.innerHTML = game.dice.randomDieSide(_);
            this.element.appendChild(die);
          });
          this.size();
        },
        built: false,
        element: document.querySelector("#board"),
        size: function() {
          const setStyle = (style, setting) => {
            game.display.functions.setStyle(
              this.element,
              style,
              setting
            );
          }
          setStyle("display", "flex");
          setStyle("height", "100%");
          setStyle("width", "100%");
          const height = this.element.clientHeight;
          const width = this.element.clientWidth;
          const max = Math.min(height, width);
          setStyle("fontSize", `${Math.floor(max / 6)}px`);
          setStyle("height", `${max}px`);
          setStyle("width", `${max}px`);
        },
        update: function() {
          if (game.state.values.hasFinished) {
            this.built = false;
            game.display.functions.setClass(this.element, "stopped");
          } else if (game.state.values.hasStarted && !game.state.countdown.isActive) {
            if (!this.built) {
              this.build();
            }
            game.display.functions.setClass(this.element, "rotate" + game.state.values.rotation);
          } else if (game.state.countdown.isActive) {
            game.display.functions.setClass(this.element);
            game.display.functions.setStyle(this.element, "display", "none");
          }
        },
      },

      /***********************************/
      /** Display - Elments - Countdown **/
      /***********************************/
      countdown: {
        element: document.querySelector("#countdown"),
        text: [
          "READY",
          "SET",
          "GO"
        ],
        update: function() {
          if (game.state.countdown.isActive) {
            game.display.functions.setClass(this.element, "display");
            game.display.functions.setInnerHTML(
              this.element,
              this.text[game.state.countdown.count]
            );
          } else {
            game.display.functions.setClass(this.element);
          }
        },
      },

      /*******************************/
      /** Display - Elements - Info **/
      /*******************************/
      info: {
        element: document.querySelector("#info"),
        update: function() {
          if (game.state.values.hasStarted) {
            game.display.functions.setClass(this.element, "hide");
          }
        }
      },

      /*********************************/
      /** Display - Elements - Rotate **/
      /*********************************/
      rotate: {
        addClick: function() {
            this.element.addEventListener("click", () => { game.state.rotate(); });
        },
        element: document.querySelector("#rotate"),
        prepare: function() {
            this.addClick();
        },
        update: function() {
          game.display.functions.setClass(
            this.element,
            (!game.state.values.hasStarted || game.state.countdown.isActive)
              && "hide"
          );
        },
      },

      /********************************/
      /** Display - Elements - Timer **/
      /********************************/
      timer: {
        element: document.querySelector("#timer"),
        update: function() {
          if (game.state.values.hasFinished) {
            game.display.functions.setInnerHTML(this.element, "GAME OVER");
            game.display.functions.setClass(this.element, "timeOut");
          } else if (game.state.timer.value !== null) {
            game.display.functions.setClass(this.element);
            const { value } = game.state.timer;
            const minutes = Math.floor(value / 60);
            let seconds = (value % 60).toString();
            if (seconds.length < 2) {
              seconds = "0" + seconds;
            }
            game.display.functions.setInnerHTML(
              this.element,
              `TIME LEFT: ${minutes}:${seconds}`
            );
          } else {
            game.display.functions.setInnerHTML(this.element);
          }
        },
      },

      /*********************************/
      /** Display - Elements - Toggle **/
      /*********************************/
      toggle: {
        addClick: function() {
          this.element.addEventListener("click", () => game.state.toggle());
        },
        element: document.querySelector("#toggle"),
        prepare: function() {
          this.update();
          this.addClick();
        },
        update: function() {
          if (game.state.countdown.isActive) {
            game.display.functions.setClass(this.element, "hide");
          } else {
            game.display.functions.setClass(this.element);
          }
          game.display.functions.setInnerHTML(this.element, this.text[game.state.values.hasStarted]);
        },
        text: {
          false: "START",
          true: "STOP",
        },
      },
    },


    /*************************/
    /** Display - Functions **/
    /*************************/
    functions: {

      /*****************************************/
      /** Display - Functions - Clear Element **/
      /*****************************************/
      clearElement: (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
      },

      /***********************************/
      /** Display - Functions - Prepare **/
      /***********************************/
      prepare: function() {
        game.display.elements.toggle.prepare();
        game.display.elements.rotate.prepare();
      },

      /*************************************/
      /** Display - Functions - Set Class **/
      /*************************************/
      setClass: (element, CSSclass) => {
        if (element.classList.value !== CSSclass) {
          element.classList.remove(...element.classList);
          if (typeof CSSclass !== "undefined") {
            element.classList.add(CSSclass);
          }
        }
      },

      /*****************************************/
      /** Display - Functions - Set InnerHTML **/
      /*****************************************/
      setInnerHTML: (element, innerHTML = "") => {
        if (element.innerHTML !== innerHTML) {
          element.innerHTML = innerHTML;
        }
      },

      /*************************************/
      /** Display - Functions - Set Style **/
      /*************************************/
      setStyle: (element, style, setting) => {
        if (element.style[style] !== setting) {
          element.style[style] = setting;
        }
      },

      /*********************************/
      /** Display - Functions - Start **/
      /*********************************/
      start: function() {
        this.prepare();
        setInterval(() => this.state.watcher(), 100);
      },

      /*********************************/
      /** Display - Functions - State **/
      /*********************************/
      state: {
        copy: null,
        watcher: function() {
          const stateCopy = JSON.stringify(game.state);
          if (this.copy != stateCopy) {
            this.copy = stateCopy;
            game.display.functions.update();
          }
        },
      },

      /**********************************/
      /** Display - Functions - Update **/
      /**********************************/
      update: function() {
        Object.values(game.display.elements)
          .forEach(_ => _.update());
      }
    },
  }


  /***********/
  /** State **/
  /***********/
  const state = {

    /***********************/
    /** State - Countdown **/
    /***********************/
    countdown: {
      count: null,
      countStart: -1,
      isActive: false,
      start: function() {
        this.count = this.countStart;
        this.isActive = true;
        this.update();
      },
      update: function() {
        this.count++;
        if (this.count < game.display.elements.countdown.text.length) {
          setTimeout(() => this.update(), 1000);
        } else {
          this.isActive = false;
          game.state.timer.start();
        }
      },
    },

    /********************/
    /** State - Rotate **/
    /********************/
    rotate: function() {
      this.values.rotation++;
      if (this.values.rotation > 3) { this.values.rotation = 0; }
    },

    /*******************/
    /** State - Start **/
    /*******************/
    start: () => {
      game.display.functions.start();
    },

    /*******************/
    /** State - Timer **/
    /*******************/
    timer: {
      clear: function() {
        clearInterval(game.state.timer.timeout);
        this.value = null;
      },
      start: function() {
        this.clear();
        this.value = this.startValue;
        this.timeout = setInterval(() => this.update(), 1000);
      },
      startValue: 180, // 3 minutes in seconds
      timeout: null,
      update: function() {
        this.value--;
        if (this.value <= 0) {
          this.value = null;
          game.state.toggle();
        }
      },
      value: null,
    },

    /********************/
    /** State - Toggle **/
    /********************/
    toggle: function() {
      this.values.hasStarted = !this.values.hasStarted;

      if (this.values.hasStarted) {
        this.values.hasFinished = false;
        this.countdown.start();
      } else {
        this.values.hasFinished = true;
        this.values.rotation = 0;
        this.timer.clear();
      }
    },


    /********************/
    /** State - Values **/
    /********************/
    values: {
      hasFinished: false,
      hasStarted: false,
      rotation: 0,
    }
  }


  /**********/
  /** Game **/
  /**********/
  const game = {
    dice,
    display,
    state,
  };

  game.state.start();

})();
