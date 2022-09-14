import { Food } from "@/types/food";
import { ResponsivePie } from "@nivo/pie";

export const PieChartFromFood = ({
    food,
    labels,
    interactive,
}: {
    food: Food;
    labels: boolean;
    interactive: boolean;
}) => {
    const data = [
        { id: "carbs", label: "Carbs", value: food.carb, color: "#dc4817" },
        { id: "proteins", label: "Protein", value: food.pro, color: "#c88911" },
        { id: "fat", label: "Fat", value: food.fat, color: "#ffd21c" },
        { id: "vitamins", label: "Vitamins", value: food.vit, color: "#7a9818" },
    ];

    return (
        <ResponsivePie
            data={data}
            innerRadius={0}
            padAngle={0.7}
            cornerRadius={0}
            isInteractive={interactive}
            activeOuterRadiusOffset={8}
            borderWidth={0}
            borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
            }}
            enableArcLabels={labels}
            enableArcLinkLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
            }}
            defs={[
                {
                    id: "dots",
                    type: "patternDots",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.103)",
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: "lines",
                    type: "patternLines",
                    background: "inherit",
                    color: "rgba(255, 255, 255, 0.096)",
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            tooltip={ChartTooltip}
            colors={{ datum: "data.color" }}
            fill={[
                {
                    match: {
                        id: "carbs",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "proteins",
                    },
                    id: "lines",
                },
                {
                    match: {
                        id: "fat",
                    },
                    id: "dots",
                },
                {
                    match: {
                        id: "vitamins",
                    },
                    id: "lines",
                },
            ]}
        />
    );
};

const ChartTooltip = ({ datum: { id, value, color } }: any) => {
    return (
        <div
            style={{
                padding: 6,
                color,
                background: "#222230",
                borderRadius: 10,
                zIndex: 100,
                overflow: "visible",
            }}
        >
            <strong>
                {id}: {value}
            </strong>
        </div>
    );
};
