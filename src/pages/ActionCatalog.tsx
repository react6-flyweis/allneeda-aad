import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { actions, categories, type Action } from "@/data/actions";
import AddActionModal from "@/components/AddActionModal";
import ActionDetailModal from "@/components/ActionDetailModal";

function ActionCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      const matchesSearch =
        action.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        action.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || action.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const actionsByCategory = useMemo(() => {
    return filteredActions.reduce(
      (acc, action) => {
        if (!acc[action.category]) {
          acc[action.category] = [];
        }
        acc[action.category].push(action);
        return acc;
      },
      {} as Record<string, Action[]>,
    );
  }, [filteredActions]);

  const handleActionClick = (action: Action) => {
    setSelectedAction(action);
    setModalOpen(true);
  };

  const handleAddAction = (newAction: Action) => {
    // TODO: persist or update in state as needed
    console.log("New action added:", newAction);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Action Catalog</h1>
          <p className="text-gray-500 mt-1">
            Explore all actions that workflows can perform
          </p>
        </div>
        <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Add New Action
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-lg">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search actions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8">
        {Object.keys(actionsByCategory).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No actions found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => {
              const categoryActions = actionsByCategory[category];
              if (!categoryActions) return null;

              return (
                <div
                  key={category}
                  className="bg-white rounded-2xl border border-gray-100 p-5"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {category}
                    </h2>
                    <p className="text-gray-500">
                      Lorem ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(action)}
                        className="text-left bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                      >
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {action.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {action.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {action.fields.map((field) => (
                            <Badge
                              key={field.name}
                              variant="secondary"
                              className="text-xs"
                            >
                              {field.name}
                            </Badge>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ActionDetailModal
        action={selectedAction}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <AddActionModal
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddAction={handleAddAction}
      />
    </div>
  );
}

export default ActionCatalog;
