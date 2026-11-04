import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const FAQ = ({ items, title = "Frequently Asked Questions" }: FAQProps) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 sm:px-6">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{title}</h2>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6 bg-white shadow-sm">
            <AccordionTrigger className="text-left font-semibold text-slate-800 hover:text-orange-600 transition-colors py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
