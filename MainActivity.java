package com.compluggsoft.gato;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    int activePlayer = 0; // 0 is O 1 is x
    int [] gameState = {2,2,2,2,2,2,2,2,2}; // 2 means unplayed
    int[][] winningPositions = {{0,1,2}, {3,4,5}, {6,7,8}, {0,3,6}, {1,4,7}, {2,5,8}, {0,4,8}, {2,4,6}};

    boolean gameIsActive = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void dropIn (View v) {
        ImageView counter =(ImageView) v;

        int tapCounter = Integer.parseInt(counter.getTag().toString());

        if (gameState[tapCounter] == 2 && gameIsActive) {
            counter.setTranslationY(-1000f);
            gameState[tapCounter] = activePlayer;

            if (activePlayer == 0) {
                counter.setImageResource(R.drawable.o);

                activePlayer = 1;
            } else {
                counter.setImageResource(R.drawable.x);

                activePlayer = 0;
            }
            counter.animate().translationYBy(1000f).rotation(360f).setDuration(500);

            for (int[] winningPosition : winningPositions) {
                if (gameState[winningPosition[0]] == gameState[winningPosition[1]] &&
                        gameState[winningPosition[1]] == gameState[winningPosition[2]] &&
                        gameState[winningPosition[0]] != 2) {
                    String winnerStr = "X";

                    if(gameState[winningPosition[0]] == 0) {
                        winnerStr = "O";
                    }

                    TextView winner = (TextView) findViewById(R.id.winingTv);

                    winner.setText(winnerStr + " has won!");

                    LinearLayout layout = (LinearLayout) findViewById(R.id.playAgainLayout);

                    layout.setVisibility(View.VISIBLE);
                    gameIsActive = false;
                } else {
                    boolean gameIsOver = true;
                    for (int counterState : gameState) {
                        if(counterState == 2) {
                            gameIsOver = false;
                        }
                    }

                    if (gameIsOver) {
                        TextView winner = (TextView) findViewById(R.id.winingTv);

                        winner.setText("it's a draw");

                        LinearLayout layout = (LinearLayout) findViewById(R.id.playAgainLayout);

                        layout.setVisibility(View.VISIBLE);
                        gameIsActive = false;
                    }
                }

            }
        }
    }

    public void playAgain (View view) {
        LinearLayout layout = (LinearLayout) findViewById(R.id.playAgainLayout);
        layout.setVisibility(View.INVISIBLE);

        activePlayer = 0;
        for (int i = 0; i < gameState.length; i++) {
            gameState[i] = 2;
        }

        GridLayout gridGato = (GridLayout) findViewById(R.id.gridGato);
        for (int i = 0; i < gridGato.getChildCount(); i++) {
            ((ImageView)gridGato.getChildAt(i)).setImageResource(0);

        }
        gameIsActive = true;
    }
}
