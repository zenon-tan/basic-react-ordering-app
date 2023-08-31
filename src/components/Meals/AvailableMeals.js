import DUMMY_MEALS from './dummy-meals'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

export default function AvailableMeals() {

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {DUMMY_MEALS.map(m => (
                        <MealItem key={m.id} name={m.name} description={m.description} price={m.price} id={m.id}></MealItem>
                    ))}
                </ul>
            </Card>
        </section>
    )
}